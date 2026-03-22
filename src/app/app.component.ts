import { Component, signal, resource, inject } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly productService = inject(ProductService);

  protected readonly productIds = [1, 2, 3];
  protected readonly selectedId = signal(1);

  protected readonly productResource = resource({
    params: () => ({ id: this.selectedId() }),
    loader: async ({ params }) => this.productService.getProduct(params.id),
  });

  protected selectProduct(id: number): void {
    this.selectedId.set(id);
  }
}
