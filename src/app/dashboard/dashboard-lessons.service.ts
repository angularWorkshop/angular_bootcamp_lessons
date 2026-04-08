import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { DashboardLesson } from './dashboard.models';

const DASHBOARD_LESSONS: DashboardLesson[] = [
  {
    id: 'lesson-1',
    title: 'Signals Progress Snapshot',
    owner: 'Mia',
    track: 'Angular Core',
    status: 'Live',
    durationMinutes: 32,
    learners: 148,
    summary: 'Review screen state, computed totals, and practical signal boundaries.',
  },
  {
    id: 'lesson-2',
    title: 'Template Control Flow Clinic',
    owner: 'Noah',
    track: 'Template UI',
    status: 'Draft',
    durationMinutes: 27,
    learners: 86,
    summary: 'Compare idle, loading, empty, and success states inside one feature screen.',
  },
  {
    id: 'lesson-3',
    title: 'HTTP Dashboard Review',
    owner: 'Zoe',
    track: 'Data Access',
    status: 'Archived',
    durationMinutes: 41,
    learners: 203,
    summary: 'Inspect a service-driven dashboard and explain why the UI states stay honest.',
  },
];

@Injectable({ providedIn: 'root' })
export class DashboardLessonsService {
  private failNextLoad = false;

  public loadLessons(): Observable<DashboardLesson[]> {
    if (this.failNextLoad) {
      this.failNextLoad = false;
      return throwError(() => new Error('Dashboard sync failed')).pipe(delay(80));
    }

    return of(DASHBOARD_LESSONS).pipe(delay(80));
  }

  public simulateNextFailure(): void {
    this.failNextLoad = true;
  }
}
