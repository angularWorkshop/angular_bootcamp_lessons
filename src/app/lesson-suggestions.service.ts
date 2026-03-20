import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { LessonSuggestion } from './lesson-suggestions.models';

@Injectable({
  providedIn: 'root',
})
export class LessonSuggestionsService {
  private readonly suggestions: LessonSuggestion[] = [
    { id: 1, title: 'CatchError in Practice', format: 'Guide', durationMinutes: 14 },
    { id: 2, title: 'Fallback UI Workshop', format: 'Workshop', durationMinutes: 32 },
  ];

  public getSuggestions(): Observable<LessonSuggestion[]> {
    return of(this.suggestions).pipe(delay(700));
  }
}
