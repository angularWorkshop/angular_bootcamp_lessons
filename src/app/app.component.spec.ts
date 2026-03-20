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

  it('should render the heading', () => {
    const heading = host.querySelector('h1');

    expect(heading?.textContent?.trim()).toBe('Task List');
  });

  it('should render 3 task items initially', () => {
    const items = host.querySelectorAll('[data-testid="task-item"]');

    expect(items.length).toBe(3);
  });

  it('should show 1-based index for each task', () => {
    const indices = getAll('task-index');

    expect(indices).toEqual(['1', '2', '3']);
  });

  it('should render task titles in order', () => {
    const titles = getAll('task-title');

    expect(titles).toEqual(['Set up project', 'Create components', 'Write tests']);
  });

  it('should update the list after clicking Refresh', () => {
    clickButton('refresh-btn');

    const titles = getAll('task-title');
    expect(titles).toEqual(['Create components', 'Write tests', 'Deploy to production']);
  });

  it('should re-number indices after refresh', () => {
    clickButton('refresh-btn');

    const indices = getAll('task-index');
    expect(indices).toEqual(['1', '2', '3']);
  });

  it('should show empty message after clicking Clear All', () => {
    clickButton('clear-btn');

    const empty = host.querySelector('[data-testid="empty-message"]');
    expect(empty).toBeTruthy();
    expect(empty?.textContent?.trim()).toBe('No tasks');
  });

  it('should not show task items when list is empty', () => {
    clickButton('clear-btn');

    const items = host.querySelectorAll('[data-testid="task-item"]');
    expect(items.length).toBe(0);
  });

  it('should not show empty message when list has items', () => {
    const empty = host.querySelector('[data-testid="empty-message"]');

    expect(empty).toBeNull();
  });

  it('should show items again after clear then refresh', () => {
    clickButton('clear-btn');
    clickButton('refresh-btn');

    const items = host.querySelectorAll('[data-testid="task-item"]');
    expect(items.length).toBe(3);

    const empty = host.querySelector('[data-testid="empty-message"]');
    expect(empty).toBeNull();
  });

  function clickButton(testId: string): void {
    const btn = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(btn).toBeTruthy();
    btn?.click();
    fixture.detectChanges();
  }

  function getAll(testId: string): string[] {
    return Array.from(host.querySelectorAll(`[data-testid="${testId}"]`)).map(
      el => el.textContent?.trim() ?? '',
    );
  }
});
