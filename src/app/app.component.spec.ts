import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { LessonDto } from './lesson-api.models';
import { LessonApiService } from './lesson-api.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let lessonApiService: { getLessons: jest.Mock };

  const sampleLessons: LessonDto[] = [
    {
      id: 1,
      title: 'Angular HttpClient',
      level: 'Intermediate',
      durationMinutes: 35,
      published: true,
    },
    {
      id: 2,
      title: 'Error Handling Basics',
      level: 'Beginner',
      durationMinutes: 20,
      published: false,
    },
  ];

  beforeEach(async () => {
    lessonApiService = {
      getLessons: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: LessonApiService, useValue: lessonApiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the dashboard heading', () => {
    expect(getText('dashboard-title')).toBe('Lesson Feed Dashboard');
  });

  it('should render the load button and endpoint hint', () => {
    expect(getText('load-lessons-btn')).toBe('Load lessons');
    expect(getText('endpoint-note')).toContain('/api/lessons');
  });

  it('should show only empty state initially', () => {
    expectOnlyState('empty-state');
  });

  it('should request lessons through the service and show loading while waiting', () => {
    const pendingResponse = new Subject<LessonDto[]>();
    lessonApiService.getLessons.mockReturnValue(pendingResponse.asObservable());

    clickButton('load-lessons-btn');

    expect(lessonApiService.getLessons).toHaveBeenCalledTimes(1);
    expectOnlyState('loading-state');
  });

  it('should show the lesson list after a successful response', () => {
    lessonApiService.getLessons.mockReturnValue(of(sampleLessons));

    clickButton('load-lessons-btn');

    expectOnlyState('success-state');
    expect(host.querySelectorAll('[data-testid^="lesson-card-"]').length).toBe(2);
  });

  it('should render lesson details and derived summary after loading data', () => {
    lessonApiService.getLessons.mockReturnValue(of(sampleLessons));

    clickButton('load-lessons-btn');

    expect(getText('summary-total')).toBe('Loaded 2 lessons');
    expect(getText('summary-published')).toBe('Published 1 lessons');
    expect(getAll('lesson-title')).toEqual(['Angular HttpClient', 'Error Handling Basics']);
    expect(getAll('lesson-level')).toEqual(['Intermediate', 'Beginner']);
    expect(getAll('lesson-duration')).toEqual(['35 min', '20 min']);
    expect(getAll('lesson-status')).toEqual(['Published', 'Draft']);
  });

  it('should keep the empty state when the service returns no lessons', () => {
    lessonApiService.getLessons.mockReturnValue(of([]));

    clickButton('load-lessons-btn');

    expectOnlyState('empty-state');
  });

  it('should show the error state when the service request fails', () => {
    lessonApiService.getLessons.mockReturnValue(throwError(() => new Error('Request failed')));

    clickButton('load-lessons-btn');

    expectOnlyState('error-state');
  });

  it('should recover from an error on the next successful request', () => {
    lessonApiService.getLessons
      .mockReturnValueOnce(throwError(() => new Error('Request failed')))
      .mockReturnValueOnce(of(sampleLessons));

    clickButton('load-lessons-btn');
    expectOnlyState('error-state');

    clickButton('load-lessons-btn');

    expectOnlyState('success-state');
    expect(getText('summary-total')).toBe('Loaded 2 lessons');
  });

  it('should clear the previous success state when a new request starts', () => {
    const pendingResponse = new Subject<LessonDto[]>();
    lessonApiService.getLessons
      .mockReturnValueOnce(of(sampleLessons))
      .mockReturnValueOnce(pendingResponse.asObservable());

    clickButton('load-lessons-btn');
    expectOnlyState('success-state');

    clickButton('load-lessons-btn');

    expectOnlyState('loading-state');
    expect(host.querySelector('[data-testid="summary-total"]')).toBeNull();
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
    const allStates = ['loading-state', 'error-state', 'empty-state', 'success-state'];

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
