import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LessonChecklistComponent } from './lesson-checklist.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LessonChecklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the heading', () => {
    const heading = host.querySelector('h1');

    expect(heading?.textContent?.trim()).toBe('Immutable Lesson Checklist');
  });

  it('should render the initial checklist state', () => {
    expect(getText('completed-summary')).toBe('Completed 0 of 3 lessons');
    expect(getText('lesson-1-status')).toBe('Angular Signals - Todo');
  });

  it('should keep the child component on OnPush', () => {
    expect((LessonChecklistComponent as any).ɵcmp.onPush).toBe(true);
  });

  it('should update the visible checklist after completing the first lesson', () => {
    click('complete-first-lesson');

    expect(getText('completed-summary')).toBe('Completed 1 of 3 lessons');
    expect(getText('lesson-1-status')).toBe('Angular Signals - Done');
  });

  it('should replace the lessons array when completing the first lesson', () => {
    const initialLessons = fixture.componentInstance['lessons'];

    click('complete-first-lesson');

    expect(fixture.componentInstance['lessons']).not.toBe(initialLessons);
    expect(fixture.componentInstance['lessons'][0]).toEqual({
      id: 1,
      title: 'Angular Signals',
      completed: true,
    });
  });

  function click(testId: string): void {
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

  it('should replace the lessons array when resetting the checklist', () => {
    click('complete-first-lesson');
    const updatedLessons = fixture.componentInstance['lessons'];

    click('reset-checklist');

    expect(fixture.componentInstance['lessons']).not.toBe(updatedLessons);
    expect(fixture.componentInstance['lessons'].every((lesson: any) => !lesson.completed)).toBe(true);
  });
});
