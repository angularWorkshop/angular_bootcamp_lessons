import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductListComponent {
  public products: Product[] = [
    { name: 'Продукт 1', price: 100 },
    { name: 'Продукт 2', price: 200 }
  ];

  public addProduct() {
  }
}