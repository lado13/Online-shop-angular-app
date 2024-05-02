import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../Interface/IOrder/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  private apiUrl = 'https://localhost:7241/api';


  // The service sends the user's order to the backend

  addOrder(orderData: Order): Observable<any> {

    let url = `${this.apiUrl}/Order/Upload`
    return this.http.post<any>(url, orderData)

  }


  // The service sends the order id to the backend to remove it from the database

  removeOrder(orderID: number): Observable<any> {

    let url = `${this.apiUrl}/Order/DeleteOrderById?id=${orderID}`;
    return this.http.delete(url);

  }


}
