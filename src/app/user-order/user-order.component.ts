import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Service/productService/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../Service/OrderService/order.service';
import { error } from 'console';



@Component({
  selector: 'app-user-order',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.scss'
})
export class UserOrderComponent implements OnInit {

  constructor(
    private service: ProductService,
    private orderService: OrderService
  ) { }

  orders: any[] = [];
  ordersLoaded = false;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.service.getOrder().subscribe(
      (response) => {
        this.ordersLoaded = true;
        this.orders = response;
        console.log(response);
      },
      (error) => {
        console.log("Error log orders !!!");
      }
    )
  }

  deleteOrderById(orderID: number) {
    console.log(orderID);
    this.orderService.removeOrder(orderID).subscribe(
      (response) => {
        this.orders = this.orders.filter(o => o.orderId !== orderID);
        console.log("Succesfully remove");
      },
      (error) => {
        console.log("Error remove order !!!");
      }
    )
  }






}
