import { Component, OnInit } from '@angular/core';
import { LessonFeedItem, LessonFeedService } from './lesson-feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected lessons: LessonFeedItem[] = [];
  protected isLoading = true;

  constructor(private readonly lessonFeedService: LessonFeedService) {}

  ngOnInit(): void {
    // TODO: remove manual subscribe and render with async pipe in the template.
    this.lessonFeedService.loadLessons().subscribe((lessons) => {
      this.lessons = lessons;
      this.isLoading = false;
    });
  }
}
