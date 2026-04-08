import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { DashboardSearchService } from './dashboard/dashboard-search.service';
import { DashboardLesson, LessonStatusFilter, SearchScreenState } from './dashboard/dashboard.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = 'Dashboard Search and Refresh';
  protected readonly screenState = signal<SearchScreenState>('idle');
  protected readonly results = signal<DashboardLesson[]>([]);
  protected readonly selectedLessonId = signal<string | null>(null);
  protected readonly selectedLesson = computed(() =>
    this.results().find((lesson) => lesson.id === this.selectedLessonId()) ?? null,
  );

  protected query = '';
  protected activeQuery = '';
  protected activeStatus: LessonStatusFilter = 'all';

  private readonly queryChanges = new Subject<string>();
  private readonly statusChanges = new Subject<LessonStatusFilter>();
  private readonly refreshClicks = new Subject<void>();

  public constructor(private readonly dashboardSearchService: DashboardSearchService) {
    this.bindSearchFlow();
  }

  protected updateQuery(query: string): void {
    this.query = query;
    this.queryChanges.next(query);
  }

  protected updateStatus(status: LessonStatusFilter): void {
    this.activeStatus = status;
    // TODO: notify the reactive pipeline when the filter changes
  }

  protected refreshDashboard(): void {
    // TODO: repeat the current query/status request through the same reactive pipeline
  }

  protected selectLesson(lessonId: string): void {
    this.selectedLessonId.set(lessonId);
  }

  private bindSearchFlow(): void {
    this.queryChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        // TODO: merge filter changes and refresh clicks, request the current filters,
        // and switch the screen between searching, results, empty, and error
      )
      .subscribe();
  }
}
