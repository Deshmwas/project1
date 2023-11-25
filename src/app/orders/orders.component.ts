import { Component } from '@angular/core';
import { Product } from '../landing-page/product';
import { OrdersService } from '../orders.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Order {
  orderId: number;
  orderDate: Date;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  shippingAddress: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
   
  
  ordersId: number | null | undefined;
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
  



  constructor(private ordersService: OrdersService, private router: Router, private route: ActivatedRoute,) {this.ordersService = ordersService; }
  
   ngOnInit(): void {
    this.getOrders();
    
  }
   getOrders(): void {
    this.ordersService.getOrders()
      .subscribe(
        (orders: OrdersComponent[]) => {
          this.orders = orders;
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
  }
   
    
  deleteOrder(orderId: number): void {
    // Function in 'ordersService' to delete an order based on 'orderId'
    this.ordersService.deleteOrder(orderId)
      .subscribe(
        () => {
          console.log('Order deleted successfully.');
          // Update the local 'orders' array or handle success accordingly
        },
        error => {
          console.error('Error deleting order:', error);
          // Handle the error for the delete request
        }
      );
  }
}