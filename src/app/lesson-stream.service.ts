import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { LessonPreview } from './lesson-stream.models';

@Injectable({
  providedIn: 'root',
})
export class LessonStreamService {
  private readonly feed: LessonPreview[] = [
    { id: 1, title: 'RxJS Loading Flow', format: 'Video', durationMinutes: 18, isNew: true },
    { id: 2, title: 'Operator Chaining Basics', format: 'Workshop', durationMinutes: 42, isNew: false },
    { id: 3, title: 'Async UI Patterns', format: 'Lab', durationMinutes: 26, isNew: true },
  ];

  public getLessonStream(): Observable<LessonPreview[]> {
    return of(this.feed).pipe(delay(700));
  }
}
