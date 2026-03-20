import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap, Subject } from 'rxjs';
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
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((query) => {
          this.activeQuery = query.trim();
          this.results = [];
          this.isSearching = this.activeQuery.length > 0;
        }),
        filter((query) => query.trim().length > 0),
        switchMap((query) =>
          this.lessonSearchService.searchLessons(query).pipe(
            tap((results) => {
              this.results = results;
              this.isSearching = false;
            }),
          ),
        ),
      )
      .subscribe();
  }
}
