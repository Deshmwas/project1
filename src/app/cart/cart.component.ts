import { Component } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../landing-page/product';
import { OrdersService } from '../orders.service';
import { OrderViewModel } from '../models/order-view-model';
import { MpesaService } from '../mpesa.service';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Product[] = [];
  cartForm!: FormGroup;
  userId: string | undefined;
  shippingAddress: string | undefined;
  // cartList: Product[] | undefined;
  // customerId: number | undefined;
  location: any;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private router: Router,
    private mpesaService: MpesaService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
   this.userId = localStorage.getItem('userId') ?? undefined;


    this.cartForm= this.fb.group({
      shippingAddress:[''],
      userId:[this.userId ?? ''],
      product:this.fb.array([])
    })

    // Add cart items to form array
    this.cart.forEach((product) => {
      const control = this.fb.group({
        productId: [product.id],
        quantity: [1], // Hardcoding 1 for now
        price: [product.price]
      });
      (this.cartForm.get('product') as FormArray).push(control);
    });
  }

  getTotalPrice(): number {
    return this.cart.reduce((acc, product) => acc + parseFloat(product.price), 0);
  }

  getTotalItems() {
    return this.cart.length;
  }

buyNow() {
  const address = this.cartForm.get('shippingAddress')?.value ?? '';
  const userId = this.cartForm.get('userId')?.value ?? '';
  const products = this.cartForm.get('product')?.value ?? [];
  console.log(this.cart);
  const orderViewModels: OrderViewModel[] = [];

  for (const product of products) {
    const orderViewModel: OrderViewModel = {
      productId: product.productId,
      userId: userId,
      quantity: product.quantity,
      totalPrice: product.price * product.quantity,
      status: 'Pending',
      shippingDate: new Date().toISOString(),
      shippingAddress: address,
      orderDate: new Date(). toISOString(),
    };
      
    orderViewModels.push(orderViewModel);
    console.log(orderViewModel);
     this.router.navigate(['/receipt'], { state: { orderViewModels } });
  }

  this.ordersService.createOrder(orderViewModels).subscribe(
    response => {
      if (response.responseCode && response.responseMessage === 'Orders placed successfully.') {
        alert(response.responseMessage);
         this.cartService.clearCart();
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Error creating order:', response);
        alert('Error creating order.');
      }
    },
    error => {
      console.error('Error creating order:', error);
      const message = error.error.message || 'An error occurred while creating the order';
      console.log('Error creating order:', message);
      alert(message);
    }
  );
}


removeProduct(index: number) {
  this.cart.splice(index, 1);
}


  clearCart() {
    this.cart = [];
  }
   goBack(): void {
    this.location.back();
  }

 makePayment() {
  const totalAmount = this.getTotalPrice();

  // Navigate to PaymentComponent with totalAmount as state
  this.router.navigate(['/payment'], { state: { totalAmount } });
}

}
