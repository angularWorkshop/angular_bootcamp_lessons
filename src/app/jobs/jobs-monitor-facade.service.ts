import { Injectable, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobsStreamService } from './jobs-stream.service';

@Injectable({ providedIn: 'root' })
export class JobsMonitorFacadeService implements OnDestroy {
  public readonly events = signal<string[]>([]);
  private subscription: Subscription | null = null;

  public constructor(private readonly jobsStream: JobsStreamService) {}

  public startMonitoring(): void {
    if (this.subscription) return;
    this.subscription = this.jobsStream.events$.subscribe(event => this.events.update(list => [event, ...list]));
  }

  public stopMonitoring(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  public reconnect(): void {
    this.stopMonitoring();
    this.startMonitoring();
  }

  public ngOnDestroy(): void {
    this.stopMonitoring();
  }
}
