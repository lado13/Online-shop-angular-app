import { Component } from '@angular/core';
import { ProductService } from '../Service/productService/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../Interface/IProduct/product';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-context',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './context.component.html',
  styleUrl: './context.component.scss'
})
export class ContextComponent {

  constructor(

    private service: ProductService

  ) { }

  categories: any[] = [];
  caruselProduct: any[] = [];

  // Loadning animation
  productsLoaded: boolean = false;

  products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  categoryId: number = 0
  totalCount: number = 0;
  pageSizeArray: number[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;



  ngOnInit(): void {

    this.showCategories();
    this.loadProducts();
    this.loadCarusel();
    this.generatePageSizeArray();
    this.filterByPrice();

  }


  // Filters products by price

  filterByPrice() {

    this.service.getProductByPrice(this.minPrice, this.maxPrice).subscribe(

      (res) => {

        this.products = res
        console.log(res);
        this.minPrice = 0;
        this.maxPrice = 0;

      },
      (error) => {
        console.error(error);
      }
    );
  }



  // Generates pages based on the size of the products

  generatePageSizeArray(): void {

    this.pageSizeArray = Array.from({ length: this.pageSize }, (_, i) => i + 1);

  }


  // Filters products by category on click

  loadProductsByCategory(categoryID: number): void {

    this.categoryId = categoryID
    this.service.getProductsByCategory(categoryID, this.currentPage, this.pageSize).subscribe(

      (response) => {

        this.products = response;

      },
      (error) => {
        console.log(error);
      }
    )
  }


  onPageChange(page: number): void {

    this.currentPage = page;
    this.loadProductsByCategory(this.categoryId);
    this.loadProducts();

  }

  // Loads all categories

  showCategories(): void {

    this.service.getCategory().subscribe(

      (response) => {

        this.categories = response;

      },
      (error) => {
        console.log(error);
      }
    )
  }

  // Loads all products

  loadProducts(): void {

    this.service.getProducts(this.currentPage, this.pageSize).subscribe(

      (response) => {

        this.products = response.products;
        this.totalCount = response.totalCount;
        this.productsLoaded = true;

      }),
      (error: any) => {
        console.log(error);
      }
  }


  

  // Loads the carousel by moving products

  loadCarusel(): void {

    this.service.getAllProduct().subscribe(

      (response) => {

        this.caruselProduct = response;

      },
      (error) => {
        console.log(error);
      }
    )
  }





}
