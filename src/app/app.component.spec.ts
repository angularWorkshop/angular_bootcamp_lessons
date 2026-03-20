import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { LessonSuggestion } from './lesson-suggestions.models';
import { LessonSuggestionsService } from './lesson-suggestions.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let lessonSuggestionsService: { getSuggestions: jest.Mock };

  const liveSuggestions: LessonSuggestion[] = [
    { id: 1, title: 'CatchError in Practice', format: 'Guide', durationMinutes: 14 },
    { id: 2, title: 'Fallback UI Workshop', format: 'Workshop', durationMinutes: 32 },
  ];

  beforeEach(async () => {
    lessonSuggestionsService = {
      getSuggestions: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: LessonSuggestionsService, useValue: lessonSuggestionsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the suggestions heading and button', () => {
    expect(getText('suggestions-title')).toBe('Resilient Lesson Suggestions');
    expect(getText('load-suggestions-btn')).toBe('Load suggestions');
  });

  it('should show only the empty state initially', () => {
    expectOnlyState('empty-state');
  });

  it('should request suggestions and show loading while waiting', () => {
    const pendingRequest = new Subject<LessonSuggestion[]>();
    lessonSuggestionsService.getSuggestions.mockReturnValue(pendingRequest.asObservable());

    clickButton('load-suggestions-btn');

    expect(lessonSuggestionsService.getSuggestions).toHaveBeenCalledTimes(1);
    expectOnlyState('loading-state');
  });

  it('should show live suggestions without the fallback note after success', () => {
    lessonSuggestionsService.getSuggestions.mockReturnValue(of(liveSuggestions));

    clickButton('load-suggestions-btn');

    expectOnlyState('results-state');
    expect(host.querySelector('[data-testid="fallback-note"]')).toBeNull();
    expect(getText('summary-count')).toBe('Showing 2 suggestions');
  });

  it('should switch to fallback suggestions when the request fails', () => {
    lessonSuggestionsService.getSuggestions.mockReturnValue(throwError(() => new Error('Request failed')));

    clickButton('load-suggestions-btn');

    expectOnlyState('results-state');
    expect(getText('fallback-note')).toContain('fallback suggestions');
    expect(getAll('suggestion-title')).toEqual(['Offline Angular Roadmap', 'RxJS Recovery Checklist']);
  });

  it('should render fallback suggestion metadata after an error', () => {
    lessonSuggestionsService.getSuggestions.mockReturnValue(throwError(() => new Error('Request failed')));

    clickButton('load-suggestions-btn');

    expect(getAll('suggestion-format')).toEqual(['Guide', 'Checklist']);
    expect(getAll('suggestion-duration')).toEqual(['12 min', '8 min']);
  });

  it('should clear the fallback note after the next successful request', () => {
    lessonSuggestionsService.getSuggestions
      .mockReturnValueOnce(throwError(() => new Error('Request failed')))
      .mockReturnValueOnce(of(liveSuggestions));

    clickButton('load-suggestions-btn');
    expect(getText('fallback-note')).toContain('fallback suggestions');

    clickButton('load-suggestions-btn');

    expectOnlyState('results-state');
    expect(host.querySelector('[data-testid="fallback-note"]')).toBeNull();
    expect(getAll('suggestion-title')).toEqual(['CatchError in Practice', 'Fallback UI Workshop']);
  });

  function clickButton(testId: string): void {
    const button = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(button).toBeTruthy();
    button?.click();
    fixture.detectChanges();
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
    const allStates = ['loading-state', 'empty-state', 'results-state'];

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
