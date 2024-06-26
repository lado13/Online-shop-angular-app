import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../Service/productService/product.service';
import { FormsModule } from '@angular/forms';
import { Category } from '../Interface/ICategory/category';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit {


  constructor(

    private rout: ActivatedRoute,
    private productService: ProductService,
    private route: Router
    
  ) { }


  newcategory: Category = {

    Id: 0,
    Name: ''

  }

  ngOnInit(): void {

    // By rout, I get the id and on which category I can change the name

    this.rout.params.subscribe(response => {

      this.newcategory.Id = response['id'];

    })
  }


  // Updates the category name

  updateCategory(): void {

    this.productService.updateCategory(this.newcategory.Id!, this.newcategory).subscribe(

      () => {

        this.resetForm();
        this.route.navigate(['adminPanel']);
        console.log('Category updated successfully');

      },
      error => {
        console.error('Error updating category:', error);
      }
    );
  }

  // Clears the field

  resetForm(): void {

    this.newcategory = { Name: '' };
    
  }







}
