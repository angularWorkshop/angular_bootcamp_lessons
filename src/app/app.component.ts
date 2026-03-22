import { Component } from '@angular/core';

// TODO: Import signal, linkedSignal, computed from '@angular/core'

interface Product {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly products: Product[] = [
    { id: '1', name: 'Laptop' },
    { id: '2', name: 'Phone' },
    { id: '3', name: 'Tablet' },
  ];

  // TODO: Declare selectedId = signal('1')
  // TODO: Declare editName = linkedSignal(() => ...) — linked to selected product's name
  // TODO: Declare originalName = computed(() => ...) — original name of selected product
  // TODO: Declare isModified = computed(() => ...) — editName !== originalName

  protected selectProduct(id: string): void {
    // TODO: set selectedId
  }
}
