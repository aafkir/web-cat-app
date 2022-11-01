import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [NgIf,  NgForOf],
  standalone: true

})
export class ProductsComponent implements OnInit {
  products : Product[] | null=null;
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.productService.getAllProducts().subscribe(data =>{
      this.products = data;
    })
  }
}
