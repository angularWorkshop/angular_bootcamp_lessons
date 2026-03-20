import { Component } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { LessonSuggestion } from './lesson-suggestions.models';
import { LessonSuggestionsService } from './lesson-suggestions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Resilient Lesson Suggestions';
  protected isLoading = false;
  protected isUsingFallback = false;
  protected suggestions: LessonSuggestion[] = [];
  protected readonly fallbackSuggestions: LessonSuggestion[] = [
    { id: 101, title: 'Offline Angular Roadmap', format: 'Guide', durationMinutes: 12 },
    { id: 102, title: 'RxJS Recovery Checklist', format: 'Checklist', durationMinutes: 8 },
  ];

  public constructor(private readonly lessonSuggestionsService: LessonSuggestionsService) {}

  protected loadSuggestions(): void {
    this.isLoading = true;
    this.isUsingFallback = false;
    this.suggestions = [];

    this.lessonSuggestionsService
      .getSuggestions()
      .pipe(
        catchError(() => {
          this.isUsingFallback = true;
          return of(this.fallbackSuggestions);
        }),
        tap((suggestions) => {
          this.suggestions = suggestions;
          this.isLoading = false;
        }),
      )
      .subscribe();
  }
}
