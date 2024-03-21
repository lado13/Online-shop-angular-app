import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../Service/userService/user.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../Service/productService/product.service';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ThemeService } from '../Service/themeService/theme.service';
import { response } from 'express';
import { JwtDecodeService } from '../jwtDecode/jwt-decode.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export default class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private rout: Router,
    private elementRef: ElementRef,
    private themeService: ThemeService,
    private jwtService: JwtDecodeService
  ) { }


  searchText: string = '';
  errorMessage: string = '';
  filteredProduct: any[] = [];
  showContainer: boolean = true;
  showUserInfo: boolean = true;
  userEmpty: boolean = true;
  selectedFile: File | null = null;

  loggedUser: any = {
    userId: 0,
    firstName: '',
    image: ''
  }

  updateUser: any = {
    firstName: '',
    image: ''
  }

  ngOnInit(): void {
    this.loadLoggedUser();
    this.themeService.ngOnInit();
  }

  themeMode(){
    this.themeService.toggleDarkMode();
  }

  onSubmit(): void {

    let btn = document.getElementById("close-btnn");
    btn?.click();

    this.updateUser.firstName = this.loggedUser.firstName;
    this.updateUser.image = this.loggedUser.image;

    if (this.selectedFile == null) {
      this.userInfoEdit();
    }
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.updateUser.image = reader.result as string;
        this.updateUser;
        this.userInfoEdit();
      };
      reader.readAsDataURL(this.selectedFile);
    
    } else {
      console.error('No file selected');
    }
  }

  userInfoEdit() {
    this.userService.updateUser(this.loggedUser.userId, this.updateUser).subscribe(
      (response) => {
        // alert(response.message)
        console.log(response.message);
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  userImgClick() {
    this.showUserInfo = !this.showUserInfo
  }

  loadLoggedUser() {
    let user = localStorage.getItem('token');
    if (user == null) {
      this.userEmpty = false;
    } else {
      let item = this.jwtService.decodeToken(user)
      if (item.Image == '') {
        item.Image = "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
      }
      this.loggedUser.firstName = item.unique_name;
      this.loggedUser.image = item.Image;
      this.loggedUser.userId = item.nameid;
      console.log(item);
      console.log(this.loggedUser);
    }
  }

  singOut(): void {
    this.userService.logout();
    this.rout.navigate(['']);
    this.userEmpty = false;
    this.showUserInfo = true;
    // alert("Log Out")
    console.log("Log Out !!!");
  }

  findProductByTitle() {
    if (this.searchText.trim() === '') {
      this.filteredProduct = [];
      this.errorMessage = 'Please enter a product title.';
      return;
    }
    this.productService.getProductByTitle(this.searchText).subscribe(
      (response) => {
        this.filteredProduct = response
        console.log(response);
      },
      (error) => {
        console.log("Product not find by title !!!");
      }
    )
  }

  searchInputAnimation(): void {
    let inp = document.querySelector('.search-inp') as HTMLInputElement;
    inp.classList.toggle('inpAnimation');
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showContainer = false;
    } else {
      this.showContainer = true;
    }
  }




}
