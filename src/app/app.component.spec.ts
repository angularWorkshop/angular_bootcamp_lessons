import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProgressCardComponent } from './progress-card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ProgressCardComponent],
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

    expect(heading?.textContent?.trim()).toBe('OnPush Progress Card');
  });

  it('should render the initial progress card state', () => {
    expect(getText('progress-text')).toBe('Completed 2 of 5 lessons');
    expect(getText('progress-percent')).toBe('40% complete');
  });

  it('should update the visible progress after completing a lesson', () => {
    click('complete-lesson');

    expect(getText('progress-text')).toBe('Completed 3 of 5 lessons');
    expect(getText('progress-percent')).toBe('60% complete');
  });

  it('should use OnPush strategy in the child component', () => {
    expect((ProgressCardComponent as any).ɵcmp.onPush).toBe(true);
  });

  it('should replace the progress object when completing a lesson', () => {
    const initialProgress = fixture.componentInstance['progress'];

    click('complete-lesson');

    expect(fixture.componentInstance['progress']).not.toBe(initialProgress);
    expect(fixture.componentInstance['progress']).toEqual({
      completedLessons: 3,
      totalLessons: 5,
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

  it('should replace the progress object when resetting progress', () => {
    click('complete-lesson');
    const updatedProgress = fixture.componentInstance['progress'];

    click('reset-progress');

    expect(fixture.componentInstance['progress']).not.toBe(updatedProgress);
    expect(fixture.componentInstance['progress']).toEqual({
      completedLessons: 0,
      totalLessons: 5,
    });
  });
});
