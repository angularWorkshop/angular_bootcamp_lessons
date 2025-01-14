import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  public readonly products: Product[] = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Smartphone', price: 30000 },
  ];

  constructor(private router: Router) {}

  public goToDetail(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
