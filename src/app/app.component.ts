import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { MetricsService } from './metrics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly metricsService = inject(MetricsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly lessons = signal<string[]>([]);
  readonly heartbeat = signal(0);

  ngOnInit(): void {
    this.metricsService.getLifecycleLessons().subscribe((items) => {
      this.lessons.set(items);
    });

    interval(100)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.heartbeat.update((value) => value + 1);
      });
  }
}
