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
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 200 }
  ];

  public newProductName: string = '';
  public newProductPrice: number | null = null;

  public addProduct() {
    if (this.newProductName.trim() && this.newProductPrice !== null) {
      this.products.push({
        name: this.newProductName,
        price: this.newProductPrice
      });
      this.newProductName = '';
      this.newProductPrice = null;
    }
  }
}