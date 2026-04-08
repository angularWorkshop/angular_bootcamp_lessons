import { Component } from '@angular/core';
import { OrdersApiService } from './orders/orders-api.service';
import { OrdersFacadeService } from './orders/orders-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Feature State and Screen Orchestration';

  public constructor(
    protected readonly facade: OrdersFacadeService,
    private readonly ordersApiService: OrdersApiService,
  ) {}

  protected useMode(mode: 'success' | 'empty' | 'error'): void {
    this.ordersApiService.setMode(mode);
  }
}
