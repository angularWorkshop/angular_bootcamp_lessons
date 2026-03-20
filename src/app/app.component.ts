import { Component } from '@angular/core';
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

    // TODO: handle request errors through catchError and switch the UI to fallback suggestions
  }
}
