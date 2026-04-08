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
      next: (orders) => {
        this.orders.set(orders);
        this.selectedOrderId.set(orders[0]?.id ?? null);
        this.screenState.set(orders.length > 0 ? 'success' : 'empty');
      },
      error: () => {
        this.orders.set([]);
        this.selectedOrderId.set(null);
        this.screenState.set('error');
      },
    });
  }

  public refresh(): void {
    this.loadOrders();
  }

  public selectOrder(orderId: string): void {
    this.selectedOrderId.set(orderId);
  }
}
