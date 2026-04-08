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
    // TODO: hydrate search, status, sort, and page from the route state.
  }

  public updateSearch(term: string): void {
    // TODO: store the term, reset the page, and sync the full state into the URL.
  }

  public updateStatus(status: 'all' | 'Live' | 'Draft'): void {
    // TODO: store the status, reset the page, and sync the full state into the URL.
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
