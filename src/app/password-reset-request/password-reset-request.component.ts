import { Component } from '@angular/core';
import { UserService } from '../Service/userService/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Recoverable } from 'repl';

@Component({
  selector: 'app-password-reset-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-reset-request.component.html',
  styleUrl: './password-reset-request.component.scss'
})
export class PasswordResetRequestComponent {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  email: string = '';
  token: string = '';
  newPassword: string = '';
  message: string = '';
  repeatPassword: string = '';
  success: string = '';
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const recoveryToken = params['token'];
      const recEmail = params['email'];
      console.log('Token:', recoveryToken);
      console.log('Email:', recEmail);
      this.email = recEmail;
      this.token = recoveryToken;
    });
  }

  onSubmitReset(): void {
    if (this.newPassword !== this.repeatPassword) {
      console.log('Passwords do not match.');
      return;
    }
    this.resetPassword();
  }

  resetPassword() {
    this.userService.resetPassword(this.email, this.token, this.newPassword).subscribe(
      (response) => {
        this.success = response.message;
        console.log(response.message);
        this.resetForm();
        
      },
      (error) => {
        console.log(error.error.message);
        this.message = error.error.message;
      });
  }

  resetForm(): void {
    this.newPassword = '';
    this.repeatPassword = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordRepeatVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }





}
