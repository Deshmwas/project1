import { Injectable } from '@angular/core';
import { Product } from './landing-page/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];

  addToCart(product: Product) {
    this.cart.push(product);
  }

  getCart() {
    return this.cart;
  }

  // clearCart() {
  //   this.cart = [];
  //   return this.cart;
  // }
  clearCart() {
    this.cart = [];
  }
}

