import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected isLoading = false;
  protected hasError = false;
  protected products: Product[] = [];

  showLoading(): void {
    this.isLoading = true;
    this.hasError = false;
    this.products = [];
  }

  showSuccess(): void {
    this.isLoading = false;
    this.hasError = false;
    this.products = [
      { id: 1, name: 'Laptop', price: 1200 },
      { id: 2, name: 'Keyboard', price: 85 },
      { id: 3, name: 'Monitor', price: 450 },
    ];
  }

  showEmpty(): void {
    this.isLoading = false;
    this.hasError = false;
    this.products = [];
  }

  showError(): void {
    this.isLoading = false;
    this.hasError = true;
    this.products = [];
  }
}
