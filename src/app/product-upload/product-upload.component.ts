import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../Service/productService/product.service';
import { Product } from '../Interface/IProduct/product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-upload',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product-upload.component.html',
  styleUrl: './product-upload.component.scss'
})
export class ProductUploadComponent implements OnInit {

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  };
  

  productData: Product = { title: '', model: '', price: 0, image: '', categoryId: 0 }
  selectedFile: File | null = null;
  categories: any[] = [];


  getCategories(): void {
    this.service.getCategory().subscribe(
      (response: any) => {
        this.categories = response
        console.log(response);    
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    )
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.productData.image = reader.result as string;
        this.upload();
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      console.error('No file selected');
    }
  }

  private upload(): void {
    this.service.uploadProduct(this.productData).subscribe(
      (response) => {
        console.log('Product uploaded successfully', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error uploading product', error);
      }
    )
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  resetForm(): void {
    this.productData = { title: '', model: '', price: 0, image: '', categoryId: 0 }
  }



}
