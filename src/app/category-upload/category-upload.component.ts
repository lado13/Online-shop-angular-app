import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../Service/productService/product.service';
import { Category } from '../Interface/ICategory/category';
import { response } from 'express';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-upload',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './category-upload.component.html',
  styleUrl: './category-upload.component.scss'
})
export class CategoryUploadComponent {

  constructor(

    private categoryService: ProductService
    
  ) { }

  categoryData: Category = {

    Name: '',

  }

  onSubmit() {

    this.uploadCategory();

  }

  // Adds a new category

  uploadCategory() {

    this.categoryService.postCategory(this.categoryData).subscribe(

      (response) => {

        this.resetForm();
        console.log(response);

      },
      (error) => {
        console.log("Error upload category !!!");
      }
    )
  }


  // Clears the field

  resetForm(): void {

    this.categoryData = { Name: '' };
    
  }





}
