import { Injectable, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TABLE_ROWS } from './table-state.models';

@Injectable({ providedIn: 'root' })
export class TableStateFacadeService {
  public readonly search = signal('');
  public readonly statusFilter = signal<'all' | 'Live' | 'Draft'>('all');
  public readonly sort = signal<'title' | 'owner'>('title');
  public readonly page = signal(1);
  public readonly visibleRows = computed(() => {
    const filtered = TABLE_ROWS.filter((row) =>
      row.title.toLowerCase().includes(this.search().toLowerCase())
      && (this.statusFilter() === 'all' || row.status === this.statusFilter())
    );
    const sorted = [...filtered].sort((left, right) =>
      String(left[this.sort()]).localeCompare(String(right[this.sort()]))
    );
    return sorted.slice((this.page() - 1) * 2, this.page() * 2);
  });

  public constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  public connectRoute(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.search.set(params.get('search') ?? '');
      this.statusFilter.set((params.get('status') as 'all' | 'Live' | 'Draft') ?? 'all');
      this.sort.set((params.get('sort') as 'title' | 'owner') ?? 'title');
      this.page.set(Number(params.get('page') ?? '1'));
    });
  }

  public updateSearch(term: string): void {
    this.search.set(term);
    this.page.set(1);
    this.syncUrl();
  }

  public updateStatus(status: 'all' | 'Live' | 'Draft'): void {
    this.statusFilter.set(status);
    this.page.set(1);
    this.syncUrl();
  }

  public nextPage(): void {
    this.page.update((page) => page + 1);
    this.syncUrl();
  }

  public changeSort(sort: 'title' | 'owner'): void {
    this.sort.set(sort);
    this.syncUrl();
  }

  private syncUrl(): void {
    this.router.navigate([], {
      queryParams: { search: this.search(), status: this.statusFilter(), sort: this.sort(), page: this.page() },
    });
  }
}
