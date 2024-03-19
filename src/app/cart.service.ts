

import { Injectable } from '@angular/core';
import { Product } from './landing-page/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  public cart: Product[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartUpdateMessageSubject = new BehaviorSubject<string>('');

  cartCount$ = this.cartCountSubject.asObservable();
  cartUpdateMessage$ = this.cartUpdateMessageSubject.asObservable();

  addToCart(product: Product) {
    this.cart.push(product);
    this.updateCartCountAndMessage('Product added to cart');
  }
   getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.updateCartCountAndMessage('Cart cleared');
  }

  private updateCartCountAndMessage(message: string) {
    const count = this.cart.length;
    this.cartCountSubject.next(count);
    this.cartUpdateMessageSubject.next(message);
  }
}
