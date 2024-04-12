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
  productsLoaded: boolean = false;
  products: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  categoryId: number = 0
  totalCount: number = 0;
  pageSizeArray: number[] = [];


  ngOnInit(): void {
    this.showCategories();
    this.loadProducts();
    this.loadCarusel();
    this.generatePageSizeArray();
  }

  generatePageSizeArray(): void {

    this.pageSizeArray = Array.from({ length: this.pageSize }, (_, i) => i + 1);

  }

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
