
import { Component } from '@angular/core';
import { LandingPageService } from '../Services/landing-page.service';
import { CartService } from '../cart.service';
import { Product } from '../landing-page/product';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscribable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomeComponent {

  products: Product[] = [];
  imageData: any;
  sanitizer: any;
  userEmail: string | null | undefined;
  cart: Product[] = [];
  location: any;
  cartCount$ = new BehaviorSubject<number>(0);
  cartCountSubscription: any;
  cartUpdateMessageSubscription: any;
  cartUpdateMessage: string | undefined;
  query: string = '';
  message: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private landingPageService: LandingPageService,
    private cartService: CartService,
    private searchService: SearchService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.subscribeToCartUpdates(); // Add this line to subscribe to cart updates
  }

  getAllProducts() {
    this.landingPageService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data.map(product => ({
          ...product,
          image: product['imageUrl'],
          isLoading: false
        }));
      },
      (error: any) => {
        console.log(`Error fetching products: ${error}`);
      }
    );
  }

  onFileSelected(event: any) {
    this.imageData = event.target.files[0];
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.updateCartCount(); // Update cart count after adding to the cart
  }

  private updateCartCount() {
    this.cartCount$.next(this.cartService.getCart().length);
  }

  private subscribeToCartUpdates() {
    this.cartCountSubscription = this.cartService.cartCount$.subscribe(
      (count: number) => {
        this.updateCartCount();
      }
    );

    this.cartUpdateMessageSubscription = this.cartService.cartUpdateMessage$.subscribe(
      (message: string) => {
        this.cartUpdateMessage = message;
      }
    );
  }

 ngOnDestroy() {
    this.unsubscribeFromCartUpdates();
  }

  private unsubscribeFromCartUpdates() {
    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }

    if (this.cartUpdateMessageSubscription) {
      this.cartUpdateMessageSubscription.unsubscribe();
    }
  }

  search() {
    this.searchService.search(this.query).subscribe(
      (data: any) => {
        if (data && data.message) {
          alert(data.message);
          this.products = [];
        } else {
          this.products = data;
          this.message = null;
        }
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.products = [];
      }
    );
  }
  showMessage() {
    const messageDiv = document.getElementById('cartUpdateMessage');

    if (messageDiv) {
        messageDiv.innerText = 'Product added to cart';

        // Set opacity to 1 to make the message visible
        messageDiv.style.opacity = '1';

        // Use setTimeout to delay hiding the message
        setTimeout(() => {
            // Set opacity back to 0 to make the message disappear
            messageDiv.style.opacity = '0';
        }, 3000); // 3000 milliseconds (3 seconds) is the duration of the fade-in and fade-out animation
    }
}
clearCartUpdateMessage() {
  this.cartUpdateMessage = ''; // Clear the message
}


}
