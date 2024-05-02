import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../Service/productService/product.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error, log } from 'console';


@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {


  constructor(

    private service: ProductService,
    private rout: Router

  ) { }


  categories: any[] = [];
  products: any[] = [];

  // loading animation
  productsLoaded: boolean = false;


  ngOnInit(): void {

    this.showCategories();
    this.loadAllProducts();

  }



  // Displays all categories

  showCategories(): void {

    this.service.getCategory().subscribe(

      (response) => {

        this.categories = response;

      },
      (error) => {
        console.log("Error fetching categories !!!");
      }
    )
  }





  // Filters products by category on click

  showProductByCategoryClick(productID: number): void {

    this.service.getProductByCategory(productID).subscribe(

      (response) => {

        this.products = response;

      },
      (error) => {
        console.log(error);
      }
    )
  }




  // Loads all products

  loadAllProducts(): void {

    this.service.getAllProduct().subscribe(

      (response) => {

        this.products = response;
        this.productsLoaded = true;

      },
      (error) => {
        console.log(error);
      }
    )
  }


  // Deletes the product

  deleteProduct(productId: string): void {

    this.service.removeProduct(productId).subscribe(

      () => {

        console.log("Product removed", productId);
        this.products = this.products.filter(product => product.id !== productId);

      },
      (error) => {
        console.log("Error removing product", error);
      }
    )
  }




  // Removes a category

  deleteCategory(categoryID: string): void {

    this.service.removeCategory(categoryID).subscribe(

      () => {

        console.log("category removed", categoryID);
        this.categories = this.categories.filter(category => category.id !== categoryID);

      },
      () => {
        console.log("Error remove category !!!");
      }
    )
  }



  // Updates the category name

  editCategory(id: number) {

    this.rout.navigate(['editCategory', id]);

  }


  // Updates the product title

  editProduct(id: number) {

    this.rout.navigate(['editProduct', id]);

  }





}
