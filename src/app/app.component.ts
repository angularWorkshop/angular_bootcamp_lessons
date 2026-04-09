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
  protected readonly visibleRows = computed(() => this.rows());
  private connected = false;

  public constructor(protected readonly jobsStream: JobsStreamService) {}

  protected applySearch(value: string): void {
    this.search.set(value);
  }

  protected openDrawer(rowId: string): void {
    // TODO: select the row and open the drawer with a draft title.
  }

  protected queueUpload(): void {
    // TODO: queue an upload for the selected row.
  }

  protected connectJobs(): void {
    // TODO: connect the jobs stream once and push incoming events into the jobs feed.
  }
}
