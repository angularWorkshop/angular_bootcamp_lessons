import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { DashboardLessonsService } from './dashboard/dashboard-lessons.service';
import { DashboardLesson, DashboardScreenState } from './dashboard/dashboard.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = 'Feature Dashboard Foundations';
  protected readonly screenState = signal<DashboardScreenState>('idle');
  protected readonly lessons = signal<DashboardLesson[]>([]);
  protected readonly selectedLessonId = signal<string | null>(null);
  protected readonly selectedLesson = computed(() =>
    this.lessons().find((lesson) => lesson.id === this.selectedLessonId()) ?? null,
  );
  protected readonly summaryLabel = computed(() => `Loaded ${this.lessons().length} learning cards`);

  public constructor(private readonly dashboardLessonsService: DashboardLessonsService) {}

  protected loadDashboard(): void {
    this.screenState.set('loading');

    this.dashboardLessonsService.loadLessons().subscribe({
      next: (lessons) => {
        // TODO: store lessons, select the first lesson, and switch between empty/success
        void lessons;
      },
      error: () => {
        // TODO: clear stale data and switch the screen into the error state
      },
    });
  }

  protected selectLesson(lessonId: string): void {
    // TODO: keep the selected lesson id in sync with the clicked card
    void lessonId;
  }
}
