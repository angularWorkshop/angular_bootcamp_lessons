import { Component, OnInit, inject, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { MetricsService } from './metrics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly metricsService = inject(MetricsService);

  readonly lessons = signal<string[]>([]);
  readonly heartbeat = signal(0);

  private heartbeatSubscription?: Subscription;

  ngOnInit(): void {
    this.metricsService.getLifecycleLessons().subscribe((items) => {
      this.lessons.set(items);
    });

    // TODO: replace manual subscription with takeUntilDestroyed().
    this.heartbeatSubscription = interval(100).subscribe(() => {
      this.heartbeat.update((value) => value + 1);
    });
  }
}
