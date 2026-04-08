import { Injectable, computed, signal } from '@angular/core';
import { OrdersApiService } from './orders-api.service';
import { OrderCard, OrdersScreenState } from './orders.models';

@Injectable({ providedIn: 'root' })
export class OrdersFacadeService {
  public readonly screenState = signal<OrdersScreenState>('idle');
  public readonly orders = signal<OrderCard[]>([]);
  public readonly selectedOrderId = signal<string | null>(null);
  public readonly selectedOrder = computed(() =>
    this.orders().find((order) => order.id === this.selectedOrderId()) ?? null,
  );
  public readonly summaryLabel = computed(() => `Loaded ${this.orders().length} orders`);

  public constructor(private readonly ordersApiService: OrdersApiService) {}

  public loadOrders(): void {
    this.screenState.set('loading');
    this.orders.set([]);
    this.selectedOrderId.set(null);

    this.ordersApiService.loadOrders().subscribe({
      next: () => {
        // TODO: store orders, pick the first item, and switch to success or empty.
      },
      error: () => {
        // TODO: clear stale data and move the screen to the error state.
      },
    });
  }

  public refresh(): void {
    // TODO: reuse the same orchestration path as loadOrders().
  }

  public selectOrder(orderId: string): void {
    // TODO: keep the current selection in sync with the details panel.
  }
}
