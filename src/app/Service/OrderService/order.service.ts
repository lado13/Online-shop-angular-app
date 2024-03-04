import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7241/api';

  addOrder(orderData: any): Observable<any> {
    let url = `${this.apiUrl}/Order/Upload`
    return this.http.post<any>(url, orderData)
  }

  removeOrder(orderID: number): Observable<any> {
    let url = `${this.apiUrl}/Order/DeleteOrderById?orderId=${orderID}`;
    return this.http.delete(url);
  }


}
