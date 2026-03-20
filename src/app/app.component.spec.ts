import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
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

    expect(heading?.textContent?.trim()).toBe('Todo List');
  });

  it('should render 2 initial todo items', () => {
    const items = host.querySelectorAll('[data-testid="todo-item"]');

    expect(items.length).toBe(2);
  });

  it('should render initial todo texts', () => {
    const texts = getAll('todo-text');

    expect(texts).toEqual(['Buy groceries', 'Read Angular docs']);
  });

  it('should add a new todo when clicking Add with text', async () => {
    await typeInInput('Walk the dog');
    clickButton('add-btn');

    const texts = getAll('todo-text');
    expect(texts).toEqual(['Buy groceries', 'Read Angular docs', 'Walk the dog']);
  });

  it('should clear the input after adding a todo', async () => {
    await typeInInput('Walk the dog');
    clickButton('add-btn');
    await fixture.whenStable();
    fixture.detectChanges();

    const input = host.querySelector('[data-testid="new-todo-input"]') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('should not add a todo when input is empty', () => {
    clickButton('add-btn');

    const items = host.querySelectorAll('[data-testid="todo-item"]');
    expect(items.length).toBe(2);
  });

  it('should not add a todo when input is only whitespace', async () => {
    await typeInInput('   ');
    clickButton('add-btn');

    const items = host.querySelectorAll('[data-testid="todo-item"]');
    expect(items.length).toBe(2);
  });

  it('should remove a todo when clicking its Remove button', () => {
    const removeBtns = host.querySelectorAll('[data-testid="remove-btn"]');
    (removeBtns[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    const texts = getAll('todo-text');
    expect(texts).toEqual(['Read Angular docs']);
  });

  it('should show empty message after removing all todos', () => {
    const removeBtns = host.querySelectorAll('[data-testid="remove-btn"]');
    (removeBtns[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    const removeBtns2 = host.querySelectorAll('[data-testid="remove-btn"]');
    (removeBtns2[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    const empty = host.querySelector('[data-testid="empty-message"]');
    expect(empty?.textContent?.trim()).toBe('No todos yet');
  });

  it('should handle add after remove correctly', async () => {
    const removeBtns = host.querySelectorAll('[data-testid="remove-btn"]');
    (removeBtns[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    await typeInInput('New task');
    clickButton('add-btn');

    const texts = getAll('todo-text');
    expect(texts).toEqual(['Read Angular docs', 'New task']);
  });

  function clickButton(testId: string): void {
    const btn = host.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement | null;

    expect(btn).toBeTruthy();
    btn?.click();
    fixture.detectChanges();
  }

  async function typeInInput(value: string): Promise<void> {
    const input = host.querySelector('[data-testid="new-todo-input"]') as HTMLInputElement;

    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function getAll(testId: string): string[] {
    return Array.from(host.querySelectorAll(`[data-testid="${testId}"]`)).map(
      el => el.textContent?.trim() ?? '',
    );
  }
});
