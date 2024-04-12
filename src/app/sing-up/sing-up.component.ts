import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../Service/userService/user.service';
import { User } from '../Interface/IUser/user-registration';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {

  constructor(

    private userService: UserService,
    private rout: Router
    
  ) { }

  userRegister: User = {
    firstName: '',
    lastName: '',
    image: '',
    age: 0,
    email: '',
    password: ''
  }

  message: string = '';
  repeatPassword: string = '';
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  isValidEmail!: boolean;
  selectedFile: File | null = null;



  onSubmit(): void {

    if (this.selectedFile == null) {

      this.onSubmitRegistration();

    }
    if (this.selectedFile) {

      const reader = new FileReader();
      reader.onloadend = () => {

        this.userRegister.image = reader.result as string;
        this.userRegister;
        this.onSubmitRegistration();

      }

      reader.readAsDataURL(this.selectedFile);

    } else {
      console.error('No file selected');
    }
  }

  onFileSelected(event: any): void {

    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {

      this.selectedFile = fileInput.files[0];

    }
  }

  onSubmitRegistration(): void {

    if (this.userRegister.password !== this.repeatPassword) {

      console.log('Passwords do not match.');
      return;

    }

    this.userRegistration();

  }

  checkValidEmail(event: string) {

    let value = event;
    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;

  }

  userRegistration(): void {

    if (this.checkValidEmail(this.userRegister.email)) {

      this.userService.postUserRegister(this.userRegister).subscribe(

        (response) => {

          this.message = response.message;
          // alert("User registered")
          console.log(response);
          this.resetForm();
          this.rout.navigate(['singIn']);

        },
        (error) => {

          this.message = error.error.message;
          console.log(error.error.message);

        }
      )
    }
  }

  resetForm(): void {

    this.userRegister = { firstName: '', lastName: '', image: '', age: 0, email: '', password: '' }
    this.repeatPassword = '';

  }

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;

  }

  togglePasswordRepeateVisibility() {

    this.showRepeatPassword = !this.showRepeatPassword;
    
  }


}
