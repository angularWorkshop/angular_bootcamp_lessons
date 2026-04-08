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
    this.lessons.set([]);
    this.selectedLessonId.set(null);

    this.dashboardLessonsService.loadLessons().subscribe({
      next: (lessons) => {
        this.lessons.set(lessons);
        this.selectedLessonId.set(lessons[0]?.id ?? null);
        this.screenState.set(lessons.length === 0 ? 'empty' : 'success');
      },
      error: () => {
        this.lessons.set([]);
        this.selectedLessonId.set(null);
        this.screenState.set('error');
      },
    });
  }

  protected selectLesson(lessonId: string): void {
    this.selectedLessonId.set(lessonId);
  }
}
