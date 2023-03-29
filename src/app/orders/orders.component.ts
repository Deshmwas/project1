import { Component } from '@angular/core';
import { Product } from '../landing-page/product';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
   
  
    ordersId: null | undefined;
  items: Product[] | undefined;
  total: number | undefined;
  date: Date | undefined;
 
   orders: OrdersComponent[] = [];
public productsId: string | undefined;
  public usersId: string | undefined;
  public orderDate: Date | undefined;
  public quantity: number | undefined;
  public totalPrice: number | undefined;
  public orderStatus: string | undefined;
  public shippingAddress: string | undefined;
  customerId: number | undefined;
  cartList: Product[] = [];




  constructor(private ordersService: OrdersService) {this.ordersService = ordersService; }
   ngOnInit(): void {
    this.getOrders();
  }
   getOrders(): void {
    this.ordersService.getOrders()
      .subscribe(orders => this.orders = orders);
  }
  createOrder(order: OrdersComponent): void {
    this.ordersService.createOrder(order)
      .subscribe(createdOrder => {
        this.orders.push(createdOrder);
      });
  }
}