import { Component } from '@angular/core';

// TODO: Import signal, resource, inject from '@angular/core'
// TODO: Import ProductService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // TODO: Inject ProductService

  protected readonly productIds = [1, 2, 3];

  // TODO: Declare selectedId = signal(1)

  // TODO: Declare productResource = resource({
  //   request: () => ({ id: this.selectedId() }),
  //   loader: async ({ request }) => this.productService.getProduct(request.id),
  // })

  protected selectProduct(id: number): void {
    // TODO: set selectedId
  }
}
