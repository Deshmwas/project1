import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../landing-page/product';
import { OrdersService } from '../orders.service';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-order-form-component',
  templateUrl: './order-form-component.component.html',
  styleUrls: ['./order-form-component.component.css']
})
export class OrderFormComponentComponent {
  shippingAddress: string | undefined;
  cart: Product[] = [];
  totalPrice: number | undefined;
  cartItems: Product[] = [];
  orderViewModel: any;
  orders: any;
  customerId: number | undefined;
  orderForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private cartService: CartService,
    private ordersService: OrdersService ,
    private formBuilder: FormBuilder,
  ) {
    this.orderForm = this.formBuilder.group({
      productId: ['', Validators.required],
      userId: ['', Validators.required],
      quantity: ['', Validators.required],
      totalPrice: ['', Validators.required],
      status: ['', Validators.required],
      shippingDate: [''],
      shippingAddress: ['']
    });
  }

  onSubmit() {
    if (this.orderForm?.valid) {
      this.ordersService.createOrder(this.orderForm.value).subscribe(
        res => {
          console.log(res);
          // reset the form
          this.orderForm.reset();
        },
        err => console.log(err)
      );
    }
  }
}
