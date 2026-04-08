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
    const currentOrder = this.orders().find((order) => order.id === orderId);
    if (!currentOrder) return;

    const previousStatus = currentOrder.status;
    const nextStatus = previousStatus === 'Queued' ? 'Completed' : 'Queued';

    this.updateLocalStatus(orderId, nextStatus);
    this.message.set('Saving status…');

    this.ordersStatusApiService.toggleStatus(orderId, nextStatus).subscribe({
      next: () => this.message.set('Status saved.'),
      error: () => {
        this.updateLocalStatus(orderId, previousStatus);
        this.message.set('Could not save the status. Previous value was restored.');
      },
    });
  }

  private updateLocalStatus(orderId: string, nextStatus: OrderStatusCard['status']): void {
    this.orders.update((orders) =>
      orders.map((order) => order.id === orderId ? { ...order, status: nextStatus } : order),
    );
  }
}
