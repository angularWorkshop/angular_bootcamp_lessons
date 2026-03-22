import { Component } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { LessonFeedItem, LessonFeedService } from './lesson-feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly lessons$: Observable<LessonFeedItem[]> = this.lessonFeedService
    .loadLessons()
    .pipe(shareReplay(1));

  constructor(private readonly lessonFeedService: LessonFeedService) {}
}
