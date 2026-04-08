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
    this.route.queryParamMap.subscribe((params) => {
      this.search.set(params.get('search') ?? '');
      this.status.set((params.get('status') as 'all' | 'Live' | 'Draft') ?? 'all');
      this.page.set(Number(params.get('page') ?? '1'));
      this.selectedOrderId.set(params.get('orderId'));
    });
  }

  public selectOrder(orderId: string): void {
    this.selectedOrderId.set(orderId);
    this.router.navigate([], {
      queryParams: { search: this.search(), status: this.status(), page: this.page(), orderId },
    });
  }
}
