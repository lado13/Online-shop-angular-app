import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Service/userService/user.service';
import { UserLogin } from '../Interface/IUser/user-login';
import { JwtDecodeService } from '../jwtDecode/jwt-decode.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import HeaderComponent from '../header/header.component';


@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.scss'
})
export class SingInComponent {

  constructor(

    private userService: UserService,
    private jwt: JwtDecodeService,
    private rout: Router,
    
  ) { }

  resetPasswordEmail!: string;
  isValidEmail!: boolean;
  email: string = '';
  showPassword: boolean = false;
  message: string = '';

  login: UserLogin = {

    email: '',
    password: ''

  }



  // Sends the user's authentication data to the backend

  onSubmitLogin(): void {

    this.userLogin();

  }


  // During authentication, it checks the role of the user, if it is admin, 
  // it redirects to the admin page

  userLogin(): void {

    this.userService.postUserLogin(this.login).subscribe(

      (response) => {

        this.userService.storeToken(response.token);
        let tokenResponse = this.jwt.decodeToken(response.token.toString());

        if (tokenResponse.role == 'User') {

          // alert("User Logged")
          this.rout.navigate([''])

        }
        else if (tokenResponse.role == 'Admin') {
          // alert("Admin Logged")
          console.log("Admin Logged");
          this.rout.navigate(['/adminPanel'])
        }

        console.log(this.jwt.decodeToken(response.token.toString()));
        console.log(response, "Logged");
        this.resetForm();

      },
      (error) => {

        this.message = error.error.message
        console.log(error.error.message);
        
      }
    )
  }


  // Cleans the field

  resetForm(): void {

    this.login = { email: '', password: '' }

  }


  // This pattern checks for a valid email

  checkValidEmail(event: string) {

    let value = event;
    let pattern = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;

  }



  // Checks for valid email

  confirmToSend() {

    if (this.checkValidEmail(this.resetPasswordEmail)) {

      this.requestPasswordReset(this.resetPasswordEmail)
      
      console.log(this.resetPasswordEmail);
      this.resetPasswordEmail = '';

      let btn = document.getElementById("close-btn");
      btn?.click();

    }
  }


   // When retrieving a password, it sends a valid email to check if it exists in the database

  requestPasswordReset(email: string) {

    this.userService.resetPasswordRequest(email).subscribe(

      (response) => {

        console.log(response);
        this.rout.navigate(['passwordReset'], { queryParams: { token: response.token, email: response.email } });

      },
      (error) => {

        alert("User not found");
        console.log("User not found");

      }
    )
  }


  // Makes the password readable

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;
    
  }





}
