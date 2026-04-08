import { Component } from '@angular/core';
import { OrdersStatusApiService } from './orders-status/orders-status-api.service';
import { OrdersStatusFacadeService } from './orders-status/orders-status-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Optimistic Status Flow';

  public constructor(
    protected readonly facade: OrdersStatusFacadeService,
    private readonly apiService: OrdersStatusApiService,
  ) {}

  protected failNextToggle(): void {
    this.apiService.setNextMode('error');
  }
}
