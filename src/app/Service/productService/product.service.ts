import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../Interface/IProduct/product';
import { promises } from 'dns';
import { Category } from '../../Interface/ICategory/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7241/api';



  getCategory(): Observable<any> {

    let url = `${this.apiUrl}/Category/GetAll`;
    return this.http.get<any>(url);

  }

  updateProduct(id: number, product: Product) {

    let url = `${this.apiUrl}/Product/Update?id=${id}`;
    return this.http.put(url, product);

  }

  postCategory(category: Category): Observable<any> {

    let url = `${this.apiUrl}/Category/Add`;
    return this.http.post<Category>(url, category);

  }

  updateCategory(id: number, category: Category): Observable<any> {

    let url = `${this.apiUrl}/Category/Update?id=${id}`;
    return this.http.put(url, category);

  }

  getProductByCategory(productID: number): Observable<any> {

    let url = `${this.apiUrl}/Product/ProductByCategory?categoryId=${productID}`;
    return this.http.get<any>(url);

  }

  getProductsByCategory(categoryId: number, pageNumber: number = 1, pageSize: number = 10): Observable<any> {

    const url = `${this.apiUrl}/Product/ProductByCategory?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url);

  }

  getProduct(productID: string): Observable<any> {

    let url = `${this.apiUrl}/Product/Get?id=${productID}`;
    return this.http.get<any>(url);

  }

  getProductByTitle(title: string): Observable<any> {

    let url = `${this.apiUrl}/Product/SearchByTitle?keyword=${title}`;
    return this.http.get<any>(url);

  }

  getProductByPrice(min: number, max: number): Observable<any> {

    let url = `${this.apiUrl}/Product/FilterByPrice?minPrice=${min}&maxPrice=${max}`;
    return this.http.get<any>(url);

  }


  getOrder(): Observable<any> {

    let url = `${this.apiUrl}/Order/GetAll`;
    return this.http.get<any>(url);

  }

  getProducts(page: number = 1, pageSize: number = 10): Observable<any> {

    let url = `${this.apiUrl}/Product/GetAll?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);

  }

  getAllProduct(): Observable<any> {

    let url = `${this.apiUrl}/Product/GetAllProduct`;
    return this.http.get<any>(url);

  }

  removeProduct(productID: string): Observable<any> {

    let url = `${this.apiUrl}/Product/Delete?id=${productID}`;
    return this.http.delete(url);

  }

  removeCategory(categoryID: string): Observable<any> {

    let url = `${this.apiUrl}/Category/Delete?id=${categoryID}`
    return this.http.delete(url);

  }

  uploadProduct(product: Product): Observable<any> {

    let url = `${this.apiUrl}/Product/Upload`;
    return this.http.post<Product>(url, product);
    
  }





}
