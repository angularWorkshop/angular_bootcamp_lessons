import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the task title', () => {
    expect(getText('task-title')).toBe('Learn Angular Bindings');
  });

  it('should show "todo" as initial status', () => {
    expect(getText('task-status')).toBe('todo');
  });

  it('should not have the urgent class initially', () => {
    const card = getEl('task-card');

    expect(card.classList.contains('task-card--urgent')).toBe(false);
  });

  it('should add the urgent class after clicking "Mark Urgent"', () => {
    clickButton('urgent-btn');

    const card = getEl('task-card');
    expect(card.classList.contains('task-card--urgent')).toBe(true);
  });

  it('should remove the urgent class after toggling twice', () => {
    clickButton('urgent-btn');
    clickButton('urgent-btn');

    const card = getEl('task-card');
    expect(card.classList.contains('task-card--urgent')).toBe(false);
  });

  it('should advance status to "in-progress" on first Next Status click', () => {
    clickButton('status-btn');

    expect(getText('task-status')).toBe('in-progress');
  });

  it('should advance status to "done" on second Next Status click', () => {
    clickButton('status-btn');
    clickButton('status-btn');

    expect(getText('task-status')).toBe('done');
  });

  it('should add the done class when status is "done"', () => {
    clickButton('status-btn');
    clickButton('status-btn');

    const card = getEl('task-card');
    expect(card.classList.contains('task-card--done')).toBe(true);
  });

  it('should set progress bar width to 0% initially', () => {
    const bar = getEl('progress-bar') as HTMLElement;

    expect(bar.style.width).toBe('0%');
  });

  it('should set progress bar width to 50% when in-progress', () => {
    clickButton('status-btn');

    const bar = getEl('progress-bar') as HTMLElement;
    expect(bar.style.width).toBe('50%');
  });

  it('should set progress bar width to 100% when done', () => {
    clickButton('status-btn');
    clickButton('status-btn');

    const bar = getEl('progress-bar') as HTMLElement;
    expect(bar.style.width).toBe('100%');
  });

  function clickButton(testId: string): void {
    const btn = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(btn).toBeTruthy();
    btn?.click();
    fixture.detectChanges();
  }

  function getEl(testId: string): Element {
    const el = host.querySelector(`[data-testid="${testId}"]`);

    expect(el).toBeTruthy();
    return el!;
  }

  function getText(testId: string): string {
    return getEl(testId).textContent?.trim() ?? '';
  }
});
