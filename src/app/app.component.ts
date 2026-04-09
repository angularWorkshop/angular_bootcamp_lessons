import { Component, computed, signal } from '@angular/core';

interface TaskRow { id: string; title: string; status: 'Live' | 'Draft'; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly statusFilter = signal<'all' | 'Live' | 'Draft'>('all');
  protected readonly rows = signal<TaskRow[]>([
    { id: 'row-1', title: 'Billing review', status: 'Live' },
    { id: 'row-2', title: 'Workspace copy', status: 'Draft' },
    { id: 'row-3', title: 'Operations QA', status: 'Live' },
  ]);
  protected readonly visibleRows = computed(() => {
    // TODO: return the filtered rows instead of a placeholder array.
    return [];
  });

  protected setStatus(status: 'all' | 'Live' | 'Draft'): void {
    this.statusFilter.set(status);
  }
}
