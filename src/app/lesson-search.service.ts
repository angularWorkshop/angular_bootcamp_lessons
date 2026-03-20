import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { SearchLesson } from './lesson-search.models';

@Injectable({
  providedIn: 'root',
})
export class LessonSearchService {
  private readonly lessons: SearchLesson[] = [
    { id: 1, title: 'RxJS Search Pipelines', format: 'Video', level: 'Intermediate' },
    { id: 2, title: 'switchMap in Angular', format: 'Guide', level: 'Advanced' },
    { id: 3, title: 'Debounce Input Patterns', format: 'Workshop', level: 'Beginner' },
  ];

  public searchLessons(query: string): Observable<SearchLesson[]> {
    const normalizedQuery = query.trim().toLowerCase();

    return of(this.lessons).pipe(
      delay(700),
      map((lessons) =>
        lessons.filter((lesson) => lesson.title.toLowerCase().includes(normalizedQuery)),
      ),
    );
  }
}
