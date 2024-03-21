import { Component } from '@angular/core';
import { OrderService } from '../Service/OrderService/order.service';
import { UserService } from '../Service/userService/user.service';
import { Order } from '../Interface/IOrder/order';
import { CartService } from '../Service/cartService/cart.service';
import { JwtDecodeService } from '../jwtDecode/jwt-decode.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-shoping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shoping-cart.component.html',
  styleUrl: './shoping-cart.component.scss'
})
export class ShopingCartComponent {

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
    private jwtService: JwtDecodeService
  ) { }


  message: string = 'Order Product';
  loggedUserId: string = '';
  totalQuantity: number = 0;
  savedOrders: any = [];
  ordersUploaded: boolean = false;

  orderData: Order = {
    UserId: 0,
    Products: [{ ProductId: 0 }],
    OrderDate: new Date(),
  }

  ngOnInit(): void {
    this.getSavedProduct();
    this.getLoggedUserId();
    console.log(this.savedOrders);
    console.log(this.orderData);
    this.orderData.Products = this.savedOrders.map((product: any) => ({ ProductId: product.id }));
  }

  getLoggedUserId() {
    let tokenId = localStorage.getItem('token')?.toString();
    if (tokenId) {
      let decodedToken = this.jwtService.decodeToken(tokenId);
      if (decodedToken) {
        this.loggedUserId = decodedToken.nameid;
        this.orderData.UserId = parseInt(this.loggedUserId);
        console.log(`Decoded user ID ${this.loggedUserId}`);
      } else {
        console.error('Decoded token is undefined');
      }
    } else {
      console.error('Token ID is undefined or null');
    }
  }

  addOrder(): void {
    let isLogged = this.userService.isLoggedIn()
    if (this.savedOrders == "") {
      this.message = "Empty !!!"
    } else {
      if (isLogged) {
        this.orderService.addOrder(this.orderData).subscribe(
          (response) => {
            // alert("Successfully orderd")
            this.ordersUploaded = true;
            this.message = 'Successfully orderd';
            this.cartService.clearCart();
            this.savedOrders = [];
            console.log(response);
          },
          (error) => {
            console.log("Error sent orders !!!");
          }
        )
      } else {
        this.message = "Please Sing in !!!"
      }
    }
  }

  getSavedProduct() {
    this.savedOrders = this.cartService.getCartItem();
  }

  removeProduct(product: any): void {
    this.cartService.removeCart(product)
  }

  increaseQuantity(product: any): void {
    this.cartService.increaseQuantity(product);
    this.savedOrders = this.cartService.getCartItem()
  }

  decreaseQuantity(product: any): void {
    this.cartService.decreaseQuantity(product);
    this.savedOrders = this.cartService.getCartItem()
  }




}
