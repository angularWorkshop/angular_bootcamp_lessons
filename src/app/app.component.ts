import { Component } from '@angular/core';
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

    // TODO: connect the lesson stream through an RxJS pipeline and move the success updates into the stream flow
  }

  protected get totalDuration(): number {
    return this.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0);
  }
}
