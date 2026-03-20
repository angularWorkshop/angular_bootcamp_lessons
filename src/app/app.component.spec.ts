import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { SearchLesson } from './lesson-search.models';
import { LessonSearchService } from './lesson-search.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let lessonSearchService: { searchLessons: jest.Mock };

  const firstResults: SearchLesson[] = [
    { id: 1, title: 'RxJS Search Pipelines', format: 'Video', level: 'Intermediate' },
  ];

  const latestResults: SearchLesson[] = [
    { id: 2, title: 'switchMap in Angular', format: 'Guide', level: 'Advanced' },
    { id: 3, title: 'Debounce Input Patterns', format: 'Workshop', level: 'Beginner' },
  ];

  beforeEach(async () => {
    lessonSearchService = {
      searchLessons: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: LessonSearchService, useValue: lessonSearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the search heading and input', () => {
    expect(getText('search-title')).toBe('Lesson Search Console');
    expect(getInput()?.getAttribute('placeholder')).toBe('Search RxJS lessons');
  });

  it('should show the idle state initially', () => {
    expectOnlyState('idle-state');
  });

  it('should debounce the input before calling the search service', fakeAsync(() => {
    const pendingResults = new Subject<SearchLesson[]>();
    lessonSearchService.searchLessons.mockReturnValue(pendingResults.asObservable());

    typeQuery('rx');
    tick(250);
    fixture.detectChanges();

    expect(lessonSearchService.searchLessons).not.toHaveBeenCalled();

    tick(50);
    fixture.detectChanges();

    expect(lessonSearchService.searchLessons).toHaveBeenCalledTimes(1);
    expect(lessonSearchService.searchLessons).toHaveBeenCalledWith('rx');
    expectOnlyState('searching-state');
  }));

  it('should cancel the previous request when a newer query starts', fakeAsync(() => {
    const firstRequest = new Subject<SearchLesson[]>();
    const latestRequest = new Subject<SearchLesson[]>();

    lessonSearchService.searchLessons
      .mockReturnValueOnce(firstRequest.asObservable())
      .mockReturnValueOnce(latestRequest.asObservable());

    typeQuery('rxjs');
    tick(300);
    fixture.detectChanges();

    expect(lessonSearchService.searchLessons).toHaveBeenNthCalledWith(1, 'rxjs');
    expectOnlyState('searching-state');

    typeQuery('rxjs operators');
    tick(300);
    fixture.detectChanges();

    expect(lessonSearchService.searchLessons).toHaveBeenNthCalledWith(2, 'rxjs operators');
    expect(firstRequest.observed).toBe(false);
    expectOnlyState('searching-state');

    firstRequest.next(firstResults);
    firstRequest.complete();
    fixture.detectChanges();

    expect(host.querySelector('[data-testid="results-state"]')).toBeNull();

    latestRequest.next(latestResults);
    latestRequest.complete();
    fixture.detectChanges();

    expectOnlyState('results-state');
    expect(getText('summary-query')).toBe('Latest query: rxjs operators');
    expect(getText('summary-count')).toBe('Found 2 lessons');
  }));

  it('should render only the latest search results in the UI', fakeAsync(() => {
    const pendingRequest = new Subject<SearchLesson[]>();
    lessonSearchService.searchLessons.mockReturnValue(pendingRequest.asObservable());

    typeQuery('switch');
    tick(300);
    fixture.detectChanges();

    pendingRequest.next(latestResults);
    pendingRequest.complete();
    fixture.detectChanges();

    expect(getAll('result-title')).toEqual(['switchMap in Angular', 'Debounce Input Patterns']);
    expect(getAll('result-format')).toEqual(['Guide', 'Workshop']);
    expect(getAll('result-level')).toEqual(['Advanced', 'Beginner']);
  }));

  function typeQuery(value: string): void {
    const input = getInput();

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function getInput(): HTMLInputElement | null {
    return host.querySelector('[data-testid="search-input"]') as HTMLInputElement | null;
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function getAll(testId: string): string[] {
    return Array.from(host.querySelectorAll(`[data-testid="${testId}"]`)).map(
      (element) => element.textContent?.trim() ?? '',
    );
  }

  function expectOnlyState(activeTestId: string): void {
    const allStates = ['idle-state', 'searching-state', 'results-state'];

    for (const state of allStates) {
      const element = host.querySelector(`[data-testid="${state}"]`);

      if (state === activeTestId) {
        expect(element).toBeTruthy();
      } else {
        expect(element).toBeNull();
      }
    }
  }
});
