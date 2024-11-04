import { Component } from '@angular/core';

interface Product {
  name: string;
  description: string;
  showDescription: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  public products: Product[] = [
    { name: 'Продукт 1', description: 'Описание продукта 1', showDescription: false },
    { name: 'Продукт 2', description: 'Описание продукта 2', showDescription: false }
  ];

  public toggleDescription(): void {
  }
}