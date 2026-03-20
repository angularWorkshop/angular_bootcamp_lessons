import { Component } from '@angular/core';

type PageState = 'loading' | 'success' | 'empty' | 'error';

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
  protected state: PageState = 'empty';
  protected products: Product[] = [];

  showLoading(): void {
    this.state = 'loading';
    this.products = [];
  }

  showSuccess(): void {
    this.state = 'success';
    this.products = [
      { id: 1, name: 'Laptop', price: 1200 },
      { id: 2, name: 'Keyboard', price: 85 },
      { id: 3, name: 'Monitor', price: 450 },
    ];
  }

  showEmpty(): void {
    this.state = 'empty';
    this.products = [];
  }

  showError(): void {
    this.state = 'error';
    this.products = [];
  }
}
