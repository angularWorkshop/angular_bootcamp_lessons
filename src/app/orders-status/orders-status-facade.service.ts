import { Injectable, signal } from '@angular/core';
import { OrdersStatusApiService } from './orders-status-api.service';
import { OrderStatusCard } from './orders-status.models';

@Injectable({ providedIn: 'root' })
export class OrdersStatusFacadeService {
  public readonly orders = signal<OrderStatusCard[]>([]);
  public readonly message = signal('Ready to update an order status.');

  public constructor(private readonly ordersStatusApiService: OrdersStatusApiService) {
    this.orders.set(this.ordersStatusApiService.loadSeedOrders());
  }

  public toggleStatus(orderId: string): void {
    // TODO: store the previous value, apply the optimistic change, and handle rollback on error.
  }

  private updateLocalStatus(orderId: string, nextStatus: OrderStatusCard['status']): void {
    this.orders.update((orders) =>
      orders.map((order) => order.id === orderId ? { ...order, status: nextStatus } : order),
    );
  }
}
