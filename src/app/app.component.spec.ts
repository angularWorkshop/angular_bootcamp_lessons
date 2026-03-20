import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';

function getText(fixture: ComponentFixture<AppComponent>, testId: string): string {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  return el ? el.textContent.trim() : '';
}

function click(fixture: ComponentFixture<AppComponent>, testId: string): void {
  const el = fixture.nativeElement.querySelector(`[data-testid="${testId}"]`);
  el?.click();
  fixture.detectChanges();
}

function typeAndAdd(fixture: ComponentFixture<AppComponent>, title: string): void {
  const input: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="new-task-input"]');
  input.value = title;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  click(fixture, 'add-btn');
}

describe('AppComponent — Task Tracker', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title "Task Tracker"', () => {
    expect(getText(fixture, 'title')).toBe('Task Tracker');
  });

  it('should show empty message when no tasks', () => {
    expect(getText(fixture, 'empty-message')).toBe('No tasks yet');
  });

  it('should show initial stats as all zeros', () => {
    expect(getText(fixture, 'total-count')).toBe('Total: 0');
    expect(getText(fixture, 'completed-count')).toBe('Done: 0');
    expect(getText(fixture, 'remaining-count')).toBe('Remaining: 0');
  });

  // --- Tests that require TaskService to pass ---

  it('should use TaskService (service must exist and be injectable)', () => {
    const service = TestBed.inject(TaskService);
    expect(service).toBeTruthy();
  });

  it('should add a task and update the list', () => {
    typeAndAdd(fixture, 'Buy groceries');
    expect(getText(fixture, 'total-count')).toBe('Total: 1');
    expect(fixture.nativeElement.querySelectorAll('.tracker__item').length).toBe(1);
  });

  it('should hide empty message after adding a task', () => {
    typeAndAdd(fixture, 'Walk the dog');
    const emptyEl = fixture.nativeElement.querySelector('[data-testid="empty-message"]');
    expect(emptyEl).toBeNull();
  });

  it('should clear input after adding a task', () => {
    typeAndAdd(fixture, 'Read a book');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('[data-testid="new-task-input"]');
    expect(input.value).toBe('');
  });

  it('should not add empty tasks', () => {
    typeAndAdd(fixture, '   ');
    expect(getText(fixture, 'total-count')).toBe('Total: 0');
  });

  it('should toggle a task done and update completed count', () => {
    const service = TestBed.inject(TaskService);
    service.addTask('Test task');
    fixture.detectChanges();

    const taskId = service.allTasks()[0].id;
    click(fixture, `toggle-${taskId}`);

    expect(getText(fixture, 'completed-count')).toBe('Done: 1');
    expect(getText(fixture, 'remaining-count')).toBe('Remaining: 0');
  });

  it('should remove a task and update total count', () => {
    const service = TestBed.inject(TaskService);
    service.addTask('Task to remove');
    fixture.detectChanges();

    const taskId = service.allTasks()[0].id;
    click(fixture, `remove-${taskId}`);

    expect(getText(fixture, 'total-count')).toBe('Total: 0');
    expect(getText(fixture, 'empty-message')).toBe('No tasks yet');
  });

  it('should handle multiple tasks with mixed states', () => {
    const service = TestBed.inject(TaskService);
    service.addTask('Task A');
    service.addTask('Task B');
    service.addTask('Task C');
    fixture.detectChanges();

    const idA = service.allTasks()[0].id;
    click(fixture, `toggle-${idA}`);

    expect(getText(fixture, 'total-count')).toBe('Total: 3');
    expect(getText(fixture, 'completed-count')).toBe('Done: 1');
    expect(getText(fixture, 'remaining-count')).toBe('Remaining: 2');
  });

  it('should apply done styling to completed tasks', () => {
    const service = TestBed.inject(TaskService);
    service.addTask('Styled task');
    fixture.detectChanges();

    const taskId = service.allTasks()[0].id;
    click(fixture, `toggle-${taskId}`);

    const titleEl = fixture.nativeElement.querySelector(`[data-testid="title-${taskId}"]`);
    expect(titleEl.classList.contains('tracker__item-title--done')).toBe(true);
  });
});
