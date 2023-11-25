import { Component } from '@angular/core';
import { OrderViewModel } from '../models/order-view-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
 orderViewModels: OrderViewModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
  
  this.route.paramMap.subscribe(params => {
    const orderId = params.get('orderId');
    console.log('Order ID:', orderId);
    const state = history.state;
    this.orderViewModels = state.orderViewModels || [];

    
  });
}
}
