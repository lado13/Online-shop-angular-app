import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor(

    private http: HttpClient

  ) { }


  // Decodes the token sent from the backend

  decodeToken(token: string) {

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/-/g, '/');
    let jasonPayLoad = decodeURIComponent(

      atob(base64)
        .split('')
        .map((c) => {

          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)

        })
        .join('')

    );

    return JSON.parse(jasonPayLoad);

  }


}
