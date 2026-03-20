import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchLesson } from './lesson-search.models';
import { LessonSearchService } from './lesson-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly title = 'Lesson Search Console';
  protected query = '';
  protected activeQuery = '';
  protected isSearching = false;
  protected results: SearchLesson[] = [];
  private readonly searchTerms = new Subject<string>();

  public constructor(private readonly lessonSearchService: LessonSearchService) {}

  public ngOnInit(): void {
    this.bindSearchFlow();
  }

  protected updateQuery(query: string): void {
    this.query = query;
    this.searchTerms.next(query);
  }

  private bindSearchFlow(): void {
    // TODO: debounce input, cancel previous requests through switchMap, and keep only the latest search result in UI
  }
}
