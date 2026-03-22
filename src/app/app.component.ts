import { Component, signal, linkedSignal, computed } from '@angular/core';

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

  protected readonly selectedId = signal('1');

  protected readonly editName = linkedSignal(() =>
    this.products.find(p => p.id === this.selectedId())?.name ?? '',
  );

  protected readonly originalName = computed(() =>
    this.products.find(p => p.id === this.selectedId())?.name ?? '',
  );

  protected readonly isModified = computed(() =>
    this.editName() !== this.originalName(),
  );

  protected selectProduct(id: string): void {
    this.selectedId.set(id);
  }
}
