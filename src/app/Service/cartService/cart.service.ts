import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor() {

    this.LoadCart();

  }


  private storageKey = 'shoppingCart';
  productsCart: any[] = [];
  message: string = '';

  // Subject to emit cart quantity changes
  cartQuantitySubject: Subject<number> = new Subject<number>();




  private updateCartQuantity(): void {

    const quantity = this.cartQuantity();

    // Emit cart quantity through subject
    this.cartQuantitySubject.next(quantity); 

  }



  getCartQuantitySubject(): Subject<number> {

    return this.cartQuantitySubject;

  }


  // Returns the number of products in the cart

  cartQuantity() {

    return this.productsCart.reduce((total, product) => total + product.quantity, 0);

  }


  // The service adds the product to the cart

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


  // Stores products added to cart in local storage

  private saveCart(): void {

    localStorage.setItem(this.storageKey, JSON.stringify(this.productsCart));

    // Update cart quantity after saving to storage
    this.updateCartQuantity();

  }




  // Loads products from local storage

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



  // Returns all products in the cart

  getCartItem(): any[] {

    return this.productsCart;

  }



  // Removes a specific product from the cart

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



  // Clears all data in local storage

  clearCart(): void {

    localStorage.removeItem('shoppingCart');

  }



  // Increases the quantity of a particular product by one

  increaseQuantity(product: any): void {

    const existingProduct = this.productsCart.find(p => p.id === product.id);
    if (existingProduct) {

      existingProduct.quantity++;
      this.saveCart();

    }

  }




  // Reduces the quantity of a particular product by one

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




  // Returns the price of the total number of products in the cart

  getCartTotal(): number {

    return this.productsCart.reduce((total, product) => total + product.price * product.quantity, 0);

  }







}
