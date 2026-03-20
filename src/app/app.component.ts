import { Component } from '@angular/core';
import { LessonDto } from './lesson-api.models';
import { LessonApiService } from './lesson-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Lesson Feed Dashboard';
  protected readonly endpoint = '/api/lessons';
  protected isLoading = false;
  protected hasError = false;
  protected lessons: LessonDto[] = [];

  public constructor(private readonly lessonApiService: LessonApiService) {}

  protected loadLessons(): void {
    this.isLoading = true;
    this.hasError = false;
    this.lessons = [];

    // TODO: request lessons through LessonApiService and update loading, success, empty, and error states
  }

  protected get publishedCount(): number {
    return this.lessons.filter((lesson) => lesson.published).length;
  }
}
