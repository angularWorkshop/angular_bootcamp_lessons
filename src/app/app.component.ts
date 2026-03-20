import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { LessonPreview } from './lesson-stream.models';
import { LessonStreamService } from './lesson-stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'RxJS Loading Stream';
  protected isLoading = false;
  protected lessons: LessonPreview[] = [];

  public constructor(private readonly lessonStreamService: LessonStreamService) {}

  protected loadLessons(): void {
    this.isLoading = true;
    this.lessons = [];

    this.lessonStreamService
      .getLessonStream()
      .pipe(
        tap((lessons) => {
          this.lessons = lessons;
          this.isLoading = false;
        }),
      )
      .subscribe();
  }

  protected get totalDuration(): number {
    return this.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0);
  }
}
