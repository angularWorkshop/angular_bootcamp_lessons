import { Injectable, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DETAIL_ROWS } from './deep-link.models';

@Injectable({ providedIn: 'root' })
export class DeepLinkFacadeService {
  public readonly search = signal('');
  public readonly status = signal<'all' | 'Live' | 'Draft'>('all');
  public readonly page = signal(1);
  public readonly selectedOrderId = signal<string | null>(null);
  public readonly rows = signal(DETAIL_ROWS);
  public readonly selectedOrder = computed(() => this.rows().find((row) => row.id === this.selectedOrderId()) ?? null);

  public constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  public connectRoute(): void {
    // TODO: hydrate the filters and selected order id from the query params.
  }

  public selectOrder(orderId: string): void {
    // TODO: update the local selection and write the deep-link into the URL.
  }
}
