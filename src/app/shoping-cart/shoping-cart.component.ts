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
  totalPrice: number = 0;

  orderData: Order = {
    userId: 0,
    productIds: [],
    orderDate: new Date(),
  }

  ngOnInit(): void {

    this.getSavedProduct();
    this.getLoggedUserId();
    this.calculateTotalPrice();
    console.log(this.savedOrders);
    console.log(this.orderData);
    console.log(this.totalPrice);

  }


  calculateTotalPrice() {

    this.totalPrice = this.savedOrders.reduce((total:any, item: any) => total + item.price, 0);
    
  }

  getLoggedUserId() {

    let tokenId = localStorage.getItem('token')?.toString();

    if (tokenId) {

      let decodedToken = this.jwtService.decodeToken(tokenId);

      if (decodedToken) {

        this.loggedUserId = decodedToken.nameid;
        this.orderData.userId = parseInt(this.loggedUserId);
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

      this.message = "Empty !"

    } else {

      if (isLogged) {

        this.orderService.addOrder(this.orderData).subscribe(

          (response) => {
            // alert("Successfully orderd")
            this.cartService.clearCart();
            this.savedOrders = [];
            this.ordersUploaded = true;
            this.message = 'Successfully orderd';
            console.log(response);

          },
          (error) => {

            console.log("Error sent orders !!!", error);

          }
        )
      } else {

        this.message = "Please Sing in !";

      }
    }
  }


  getSavedProduct(): void {

    this.savedOrders = this.cartService.getCartItem();

    if (this.savedOrders.length > 0) {

      this.orderData.productIds = this.savedOrders.map((product: any) => product.id);

    }
  }

  removeProduct(product: any): void {

    this.cartService.removeCart(product);
    this.calculateTotalPrice();

  }

  increaseQuantity(product: any): void {

    this.cartService.increaseQuantity(product);
    this.savedOrders = this.cartService.getCartItem();

  }

  decreaseQuantity(product: any): void {

    this.cartService.decreaseQuantity(product);
    this.savedOrders = this.cartService.getCartItem();

  }




}
