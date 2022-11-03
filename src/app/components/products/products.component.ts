import {  NgFor, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';  
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [NgIf,  NgForOf],
  standalone: true

})
export class ProductsComponent implements OnInit {
  products$ : Observable <AppDataState<Product[]>> | null=null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.products$ = this.productService.getAllProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED,data: data})),
      startWith({ dataState : DataStateEnum.LOADING }),
      catchError(err => of ({ dataState : DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
}
