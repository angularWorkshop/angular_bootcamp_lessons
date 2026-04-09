import { Component, computed, signal } from '@angular/core';
import { JobsStreamService } from './jobs-stream.service';

interface OrderRow {
  id: string;
  title: string;
  status: 'Live' | 'Draft';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly search = signal('');
  protected readonly rows = signal<OrderRow[]>([
    { id: 'ord-1', title: 'Fraud review', status: 'Live' },
    { id: 'ord-2', title: 'Ops rehearsal', status: 'Draft' },
  ]);
  protected readonly selectedId = signal<string | null>(null);
  protected readonly drawerOpen = signal(false);
  protected readonly drawerDraftTitle = signal('');
  protected readonly uploads = signal<string[]>([]);
  protected readonly jobs = signal<string[]>([]);
  protected readonly visibleRows = computed(() =>
    this.rows().filter(row => row.title.toLowerCase().includes(this.search().toLowerCase())),
  );
  private connected = false;

  public constructor(protected readonly jobsStream: JobsStreamService) {}

  protected applySearch(value: string): void {
    this.search.set(value);
  }

  protected openDrawer(rowId: string): void {
    const row = this.rows().find(item => item.id === rowId);
    this.selectedId.set(rowId);
    this.drawerDraftTitle.set(row?.title ?? '');
    this.drawerOpen.set(true);
  }

  protected queueUpload(): void {
    const selectedId = this.selectedId();
    if (!selectedId) return;
    this.uploads.update(list => [...list, `spec-${selectedId}.pdf`]);
  }

  protected connectJobs(): void {
    if (this.connected) return;
    this.connected = true;
    this.jobsStream.events$.subscribe(event => {
      this.jobs.update(list => [event, ...list]);
    });
  }
}
