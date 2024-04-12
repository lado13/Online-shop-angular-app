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
  productsLoaded: boolean = false;

  ngOnInit(): void {
    this.showCategories();
    this.loadAllProducts();
  }

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

  editCategory(id: number) {

    this.rout.navigate(['editCategory', id]);

  }

  editProduct(id: number) {

    this.rout.navigate(['editProduct', id]);

  }





}
