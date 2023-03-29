import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../landing-page/product';
import { LandingPageService } from '../Services/landing-page.service';

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


  constructor(private landingPageService: LandingPageService,private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.landingPageService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data.map(product => ({
          ...product,
          image: product['imageUrl'],
          isLoading: false
        }));

        this.loadImagesForProducts();
      },
      (error: any) => {
        console.log(`Error fetching products: ${error}`);
      }
    );
  }
   createImageFromBlob(image: Blob, product: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      product.image = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      product.isLoading = false;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onFileSelected(event: any) {
    this.imageData = event.target.files[0];
  }
  loadImagesForProducts() {
    this.userEmail = localStorage.getItem('userEmail');
    for (let product of this.products) {
      if (product['imageUrl']) {
        product['isLoading'] = true;
        this.landingPageService.getImage(product['imageUrl']).subscribe(
          (image: Blob) => {
            this.createImageFromBlob(image, product);
          },
          (error: any) => {
            console.log(`Error fetching image for product with ID ${product.id}: ${error}`);
            product['isLoading'] = false;
          }
        );
      }
    }      
  }
    addToCart(product:any) {
    this.cartService.addToCart(product);
  }

}
