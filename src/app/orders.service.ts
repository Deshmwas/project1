import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from './landing-page/product';
import { OrderFormComponentComponent } from './order-form-component/order-form-component.component';

import { OrdersComponent } from './orders/orders.component';

const api_url ="https://localhost:7256/api/Orders";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
 


  constructor(private http: HttpClient) {}

  
  getOrders(): Observable<OrdersComponent[]> {
    return this.http.get<OrdersComponent[]>(api_url);
  }

  
  getOrder(id: number): Observable<OrdersComponent> {
    const url = `${api_url}/${id}`;
    return this.http.get<OrdersComponent>(url);
  }

  // POST: Create a new order
  // createOrder(order: OrdersComponent): Observable<OrdersComponent> {
  //   return this.http.post<OrdersComponent>(api_url, order);
  // }
createOrder(order: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(api_url, order, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Unknown error';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else if (error.status === 400) {
            // server-side validation error
            errorMessage = `Validation error: ${error.error.message}`;
          } else {
            // other server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
          }
          return throwError(errorMessage);
        })
      );
  }

  updateOrder(order: OrdersComponent): Observable<any> {
    const url = `${api_url}/${order.ordersId}`;
    return this.http.put(url, order);
  }

 
  deleteOrder(id: number): Observable<any> {
    const url = `${api_url}/${id}`;
    return this.http.delete(url);
  }
 


}

