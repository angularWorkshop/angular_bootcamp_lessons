import { Injectable, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobsStreamService } from './jobs-stream.service';

@Injectable({ providedIn: 'root' })
export class JobsMonitorFacadeService implements OnDestroy {
  public readonly events = signal<string[]>([]);
  private subscription: Subscription | null = null;

  public constructor(private readonly jobsStream: JobsStreamService) {}

  public startMonitoring(): void {
    // TODO: prevent duplicate subscriptions and keep exactly one active listener.
  }

  public stopMonitoring(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  public reconnect(): void {
    // TODO: rebuild the stream through stop + start instead of stacking another subscribe.
  }

  public ngOnDestroy(): void {
    this.stopMonitoring();
  }
}
