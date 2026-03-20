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

  // TODO: реализуй метод — установи state в 'loading', очисти products
  showLoading(): void {}

  // TODO: реализуй метод — установи state в 'success', заполни products
  // [{ id: 1, name: 'Laptop', price: 1200 }, { id: 2, name: 'Keyboard', price: 85 }, { id: 3, name: 'Monitor', price: 450 }]
  showSuccess(): void {}

  // TODO: реализуй метод — установи state в 'empty', очисти products
  showEmpty(): void {}

  // TODO: реализуй метод — установи state в 'error', очисти products
  showError(): void {}
}
