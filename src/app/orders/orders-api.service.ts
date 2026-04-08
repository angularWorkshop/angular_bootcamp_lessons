import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { OrderCard } from './orders.models';

const ORDERS: OrderCard[] = [
  { id: 'order-1', title: 'Billing rules review', owner: 'Mia', status: 'Live', priority: 'High', summary: 'Sync pricing rules, status mapping, and release notes before handoff.' },
  { id: 'order-2', title: 'Workspace copy refresh', owner: 'Noah', status: 'Draft', priority: 'Medium', summary: 'Prepare the next onboarding card deck and legal copy snapshot.' },
  { id: 'order-3', title: 'Operations screen QA', owner: 'Zoe', status: 'Paused', priority: 'Low', summary: 'Review fallback states, refresh behavior, and table naming consistency.' },
];

@Injectable({ providedIn: 'root' })
export class OrdersApiService {
  private mode: 'success' | 'empty' | 'error' = 'success';
  private pendingSubscriber: Subscriber<OrderCard[]> | null = null;
  private pendingMode: 'success' | 'empty' | 'error' = 'success';

  public setMode(mode: 'success' | 'empty' | 'error'): void {
    this.mode = mode;
  }

  public loadOrders(): Observable<OrderCard[]> {
    return new Observable<OrderCard[]>((subscriber) => {
      this.pendingSubscriber = subscriber;
      this.pendingMode = this.mode;

      return () => {
        if (this.pendingSubscriber === subscriber) {
          this.pendingSubscriber = null;
        }
      };
    });
  }

  public flushPending(): void {
    if (!this.pendingSubscriber) return;

    const subscriber = this.pendingSubscriber;
    const mode = this.pendingMode;
    this.pendingSubscriber = null;

    if (mode === 'error') {
      subscriber.error(new Error('Load failed'));
      return;
    }

    subscriber.next(mode === 'empty' ? [] : ORDERS);
    subscriber.complete();
  }
}
