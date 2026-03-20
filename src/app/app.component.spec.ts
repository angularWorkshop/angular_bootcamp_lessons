import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { LessonPreview } from './lesson-stream.models';
import { LessonStreamService } from './lesson-stream.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let lessonStreamService: { getLessonStream: jest.Mock };

  const sampleLessons: LessonPreview[] = [
    { id: 1, title: 'RxJS Loading Flow', format: 'Video', durationMinutes: 18, isNew: true },
    { id: 2, title: 'Operator Chaining Basics', format: 'Workshop', durationMinutes: 42, isNew: false },
  ];

  beforeEach(async () => {
    lessonStreamService = {
      getLessonStream: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: LessonStreamService, useValue: lessonStreamService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the stream heading and button', () => {
    expect(getText('stream-title')).toBe('RxJS Loading Stream');
    expect(getText('load-stream-btn')).toBe('Load stream');
  });

  it('should show only the empty state initially', () => {
    expectOnlyState('empty-state');
  });

  it('should request the lesson stream and show loading while waiting', () => {
    const pendingStream = new Subject<LessonPreview[]>();
    lessonStreamService.getLessonStream.mockReturnValue(pendingStream.asObservable());

    clickButton('load-stream-btn');

    expect(lessonStreamService.getLessonStream).toHaveBeenCalledTimes(1);
    expectOnlyState('loading-state');
  });

  it('should clear the previous success state when a fresh request starts', () => {
    const pendingStream = new Subject<LessonPreview[]>();
    lessonStreamService.getLessonStream
      .mockReturnValueOnce(of(sampleLessons))
      .mockReturnValueOnce(pendingStream.asObservable());

    clickButton('load-stream-btn');
    expectOnlyState('success-state');

    clickButton('load-stream-btn');

    expectOnlyState('loading-state');
    expect(host.querySelector('[data-testid="summary-total"]')).toBeNull();
  });

  it('should show the loaded lessons after the stream emits values', () => {
    lessonStreamService.getLessonStream.mockReturnValue(of(sampleLessons));

    clickButton('load-stream-btn');

    expectOnlyState('success-state');
    expect(host.querySelectorAll('[data-testid^="lesson-card-"]').length).toBe(2);
  });

  it('should render lesson details and total duration summary', () => {
    lessonStreamService.getLessonStream.mockReturnValue(of(sampleLessons));

    clickButton('load-stream-btn');

    expect(getText('summary-total')).toBe('Loaded 2 lessons');
    expect(getText('summary-duration')).toBe('Total duration 60 min');
    expect(getAll('lesson-title')).toEqual(['RxJS Loading Flow', 'Operator Chaining Basics']);
    expect(getAll('lesson-format')).toEqual(['Video', 'Workshop']);
    expect(getAll('lesson-duration')).toEqual(['18 min', '42 min']);
    expect(getAll('lesson-badge')).toEqual(['New', 'Ready']);
  });

  it('should return to the empty state when the stream emits an empty list', () => {
    lessonStreamService.getLessonStream.mockReturnValue(of([]));

    clickButton('load-stream-btn');

    expectOnlyState('empty-state');
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
    const allStates = ['loading-state', 'empty-state', 'success-state'];

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
