import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {

    this.LoadCart();

  }


  private storageKey = 'shoppingCart';
  productsCart: any[] = [];
  message: string = '';


  cartQuantity() {

    const totalQuantity = this.productsCart.reduce((total, product) => total + product.quantity, 0);
    return totalQuantity;

  }

  addToCart(product: any): void {

    let item = this.productsCart.find(x => x.id == product.id);
    if (item) {

      item.quantity++
      this.message = 'Already exis!!!';

    } else {

      product.quantity = 1;
      this.productsCart.unshift(product);
      this.message = 'Added';
      this.saveCart();

    }

  }


  private saveCart(): void {

    localStorage.setItem(this.storageKey, JSON.stringify(this.productsCart));
    
  }

  // private LoadCart(): void {
  //   const storedCart = localStorage.getItem(this.storageKey);
  //   if (storedCart) {
  //     this.productsCart = JSON.parse(storedCart);
  //   }
  // }


  private LoadCart(): void {

    if (typeof localStorage !== 'undefined') {

      const storedCart = localStorage.getItem(this.storageKey);

      if (storedCart) {

        this.productsCart = JSON.parse(storedCart);

      }
    } else {

      console.error('localStorage is not available.');
   
    }
  }

  getCartItem(): any[] {

    return this.productsCart;

  }

  removeCart(product: any): void {

    let index = this.productsCart.findIndex(x => x.id == product.id);

    if (index !== -1) {

      this.productsCart.splice(index, 1);
      this.saveCart();
      console.log("Successfuly removed");

    } else {
      console.log("Error removing product !!!");
    }
  }

  clearCart(): void {

    localStorage.removeItem('shoppingCart');

  }

  increaseQuantity(product: any): void {

    const existingProduct = this.productsCart.find(p => p.id === product.id);
    if (existingProduct) {

      existingProduct.quantity++;
      this.saveCart();

    }

  }

  decreaseQuantity(product: any): void {

    const existingProduct = this.productsCart.find(p => p.id === product.id);
    if (existingProduct) {

      existingProduct.quantity--;
      if (existingProduct.quantity === 0) {

        this.removeCart(product);

      }
      this.saveCart();
    }
  }

  getCartTotal(): number {

    return this.productsCart.reduce((total, product) => total + product.price * product.quantity, 0);

  }







}
