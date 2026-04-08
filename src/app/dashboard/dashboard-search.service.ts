import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { DashboardLesson, LessonStatusFilter } from './dashboard.models';

const LESSONS: DashboardLesson[] = [
  {
    id: 'signals-overview',
    title: 'Signals Progress Overview',
    owner: 'Mia',
    track: 'Angular Core',
    status: 'Live',
    durationMinutes: 32,
    learners: 148,
    summary: 'Track how signal-based state stays readable during dashboard updates.',
  },
  {
    id: 'template-clinic',
    title: 'Template Control Flow Clinic',
    owner: 'Noah',
    track: 'Template UI',
    status: 'Draft',
    durationMinutes: 27,
    learners: 86,
    summary: 'Compare loading, empty, error, and success inside one feature flow.',
  },
  {
    id: 'http-dashboard',
    title: 'HTTP Dashboard Review',
    owner: 'Zoe',
    track: 'Data Access',
    status: 'Archived',
    durationMinutes: 41,
    learners: 203,
    summary: 'Inspect service integration and what happens when network states shift.',
  },
  {
    id: 'signals-testing',
    title: 'Signals Testing Patterns',
    owner: 'Ava',
    track: 'Angular Core',
    status: 'Live',
    durationMinutes: 36,
    learners: 171,
    summary: 'Focus on observable inputs, state transitions, and UI assertions.',
  },
];

@Injectable({ providedIn: 'root' })
export class DashboardSearchService {
  private failNextRequest = false;

  public searchLessons(query: string, status: LessonStatusFilter): Observable<DashboardLesson[]> {
    if (this.failNextRequest) {
      this.failNextRequest = false;
      return throwError(() => new Error('Search sync failed')).pipe(delay(60));
    }

    const normalizedQuery = query.trim().toLowerCase();
    const results = LESSONS.filter((lesson) => {
      const matchesStatus = status === 'all' || lesson.status === status;
      const matchesQuery = normalizedQuery.length === 0
        || lesson.title.toLowerCase().includes(normalizedQuery)
        || lesson.owner.toLowerCase().includes(normalizedQuery)
        || lesson.track.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });

    return of(results).pipe(delay(60));
  }

  public simulateNextFailure(): void {
    this.failNextRequest = true;
  }
}
