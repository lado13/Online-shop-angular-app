import { Component } from '@angular/core';
import { Product } from '../Interface/IProduct/product';
import { ProductService } from '../Service/productService/product.service';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {

  constructor(

    private productService: ProductService,
    private rout: ActivatedRoute,
    private route: Router
    
  ) { }


  selectedFile: File | null = null;
  categories: any[] = [];
  newProduct: Product = {
    id: 0,
    title: '',
    model: '',
    price: 0,
    image: 'string',
    categoryId: 0,
    category: {
      id: 0,
      name: '',
    }
  }

  ngOnInit(): void {

    this.getCategories();

    // By rout, I get the id and on which product I can change the title

    this.rout.params.subscribe(response => {

      this.newProduct.id = response['id'];

    })
  }


  // Loading categories

  getCategories(): void {

    this.productService.getCategory().subscribe(

      (response: any) => {

        this.categories = response
        console.log(response);

      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    )
  }


  // Updates products

  updateProduct() {

    this.productService.updateProduct(this.newProduct.id!, this.newProduct).subscribe(

      () => {

        this.resetForm();
        this.route.navigate(['adminPanel']);
        console.log("Successfully");

      },
      () => {
        console.log("Error updating product !!!");
      }
    )
  }


  // All information is sent to the back on submit

  onSubmit(): void {

    if (this.selectedFile) {

      // I use the file in this case to upload the image

      const reader = new FileReader();
      reader.onloadend = () => {

        this.newProduct.image = reader.result as string;
        this.updateProduct();
        console.log(this.newProduct);

      };

      reader.readAsDataURL(this.selectedFile);

    } else {
      console.error('No file selected');
    }
  }

  // I use the file in this case to upload the image

  onFileSelected(event: any): void {

    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {

      this.selectedFile = fileInput.files[0];

    }
  }

  // Clears fields

  resetForm(): void {

    this.newProduct = { title: '', model: '', price: 0, image: '', categoryId: 0 }
    
  }





}
