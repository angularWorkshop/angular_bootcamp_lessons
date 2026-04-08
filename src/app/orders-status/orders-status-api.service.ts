import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { OrderStatusCard } from './orders-status.models';

const SEED_ORDERS: OrderStatusCard[] = [
  { id: 'job-1', title: 'Invoice sync batch', status: 'Queued', owner: 'Mia' },
  { id: 'job-2', title: 'Workspace legal review', status: 'Completed', owner: 'Noah' },
];

@Injectable({ providedIn: 'root' })
export class OrdersStatusApiService {
  private nextMode: 'success' | 'error' = 'success';
  private pendingSubscriber: Subscriber<{ orderId: string; nextStatus: OrderStatusCard['status'] }> | null = null;
  private pendingPayload: { orderId: string; nextStatus: OrderStatusCard['status'] } | null = null;
  private pendingMode: 'success' | 'error' = 'success';

  public loadSeedOrders(): OrderStatusCard[] {
    return SEED_ORDERS.map((order) => ({ ...order }));
  }

  public setNextMode(mode: 'success' | 'error'): void {
    this.nextMode = mode;
  }

  public toggleStatus(orderId: string, nextStatus: OrderStatusCard['status']): Observable<{ orderId: string; nextStatus: OrderStatusCard['status'] }> {
    return new Observable<{ orderId: string; nextStatus: OrderStatusCard['status'] }>((subscriber) => {
      this.pendingSubscriber = subscriber;
      this.pendingPayload = { orderId, nextStatus };
      this.pendingMode = this.nextMode;
      this.nextMode = 'success';

      return () => {
        if (this.pendingSubscriber === subscriber) {
          this.pendingSubscriber = null;
          this.pendingPayload = null;
        }
      };
    });
  }

  public flushPending(): void {
    if (!this.pendingSubscriber || !this.pendingPayload) return;

    const subscriber = this.pendingSubscriber;
    const payload = this.pendingPayload;
    const mode = this.pendingMode;

    this.pendingSubscriber = null;
    this.pendingPayload = null;

    if (mode === 'error') {
      subscriber.error(new Error('Toggle failed'));
      return;
    }

    subscriber.next(payload);
    subscriber.complete();
  }
}
