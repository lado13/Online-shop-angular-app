import { Component } from '@angular/core';
import { ProductService } from '../Service/productService/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../Service/userService/user.service';
import { CartService } from '../Service/cartService/cart.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  constructor(

    private service: ProductService,
    private router: ActivatedRoute,
    private cartService: CartService,
    private user: UserService,

  ) { }

  id: string = '';
  product: any;
  message: string = 'Add to cart';

  // Loading animation
  productsLoaded: boolean = false;

  ngOnInit(): void {


    // I get the product id by router to know which product to display detailed information
    this.router.params.subscribe(response => {

      this.id = response['id'];
      this.showProductDetail();

    })
  }


  // Loads detailed product information

  showProductDetail() {

    this.service.getProduct(this.id).subscribe(

      (response) => {

        this.product = response;
        this.productsLoaded = true;
        console.log(response);

      },
      (error) => {
        console.log("Error fetchin product detail !!!");
      }
    )
  }


  // Adds product to cart

  addProductToCart(product: any): void {

    this.cartService.addToCart(product);
    this.message = this.cartService.message;

  }




}
