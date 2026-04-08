import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { EMPTY, Subject, catchError, debounceTime, distinctUntilChanged, merge, switchMap, tap } from 'rxjs';
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
    this.statusChanges.next(status);
  }

  protected refreshDashboard(): void {
    this.refreshClicks.next();
  }

  protected selectLesson(lessonId: string): void {
    this.selectedLessonId.set(lessonId);
  }

  private bindSearchFlow(): void {
    merge(
      this.queryChanges.pipe(debounceTime(300), distinctUntilChanged()),
      this.statusChanges,
      this.refreshClicks,
    )
      .pipe(
        tap(() => {
          this.activeQuery = this.query.trim();
          this.screenState.set('searching');
          this.results.set([]);
          this.selectedLessonId.set(null);
        }),
        switchMap(() =>
          this.dashboardSearchService.searchLessons(this.activeQuery, this.activeStatus).pipe(
            tap((results) => {
              this.results.set(results);
              this.selectedLessonId.set(results[0]?.id ?? null);
              this.screenState.set(results.length === 0 ? 'empty' : 'results');
            }),
            catchError(() => {
              this.results.set([]);
              this.selectedLessonId.set(null);
              this.screenState.set('error');
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe();
  }
}
