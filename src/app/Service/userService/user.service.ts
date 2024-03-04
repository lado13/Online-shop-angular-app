import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../Interface/IUser/user-registration';
import { UserLogin } from '../../Interface/IUser/user-login';
import { json } from 'stream/consumers';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }


  private apiUrl = 'https://localhost:7241/api';


  postUserRegister(user: User): Observable<any> {
    let url = `${this.apiUrl}/User/Register`;
    return this.http.post<User>(url, user)
  }

  postUserLogin(user: UserLogin): Observable<any> {
    let url = `${this.apiUrl}/User/login`;
    return this.http.post<UserLogin>(url, user);
  }

  logout() {
    localStorage.removeItem('token')
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getAllUser(): Observable<any> {
    let url = `${this.apiUrl}/User/GetAll`;
    return this.http.get<any>(url);
  }

  deleteUserById(userID: number): Observable<any> {
    let url = `${this.apiUrl}/User/Delete?id=${userID}`;
    return this.http.delete<any>(url);
  }

  resetPasswordRequest(email: string): Observable<any> {
    let url = `${this.apiUrl}/User/request?email=${email}`;
    return this.http.post<any>(url, { email });
  }

  resetPassword(email: string, token: string, newPassword: string) {
    let url = `${this.apiUrl}/User/reset?email=${email}&token=${token}&newPassword=${newPassword}`;
    let body = { email: email, token: token, newPassword: newPassword };
    return this.http.post<any>(url, body);
  }

  updateUser(id: number, user:any): Observable<any> {
    let url = `${this.apiUrl}/User/EditUserInfo?id=${id}`
    return this.http.put<any>(url,user);
  }


}
