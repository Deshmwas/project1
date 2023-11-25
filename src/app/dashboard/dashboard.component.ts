import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../landing-page/product';
import { LandingPageService } from '../Services/landing-page.service';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  products: Product[] = [];
  imageData: any;
  sanitizer: any;
  userEmail: string | null | undefined;
 cart: Product[] = [];
  location: any;
  cartCountSubscription: any;
  cartUpdateMessageSubscription: any;
  cartUpdateMessage: string | undefined;
  cartCount$ = new BehaviorSubject<number>(0);


  constructor(private landingPageService: LandingPageService,private cartService: CartService,private searchService: SearchService, private route: ActivatedRoute,) { }
clear() {
this.query = '';
    this.products = [];
}
  query: string = '';
  message: string | null = null;
  errorMessage: string | null = null;
  ngOnInit(): void {
    this.getAllProducts();
     this.subscribeToCartUpdates(); 
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
 
   
 goBack(): void {
    this.location.back();
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.updateCartCount(); // Update cart count after adding to the cart
  }

  private updateCartCount() {
    this.cartCount$.next(this.cartService.getCart().length);
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
  clearCartUpdateMessage() {
  this.cartUpdateMessage = ''; // Clear the message
}


 
search() {
  this.searchService.search(this.query).subscribe(
    (data: any) => {
      if (data && data.message) {
        alert(data.message); // Display the message in an alert if it exists
        this.products = []; // Clear the products array
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

}