import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the nested FormArray heading and the initial module structure', () => {
    expect(getText('curriculum-title')).toBe('Curriculum Map Designer');
    expect(getText('module-count')).toBe('Modules: 1');
    expect(host.querySelector('[data-testid="module-input-0"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="lesson-input-0-0"]')).toBeTruthy();
  });

  it('should render the initial module preview and lesson count', () => {
    expect(getText('module-preview-0')).toBe('Reactive Foundations');
    expect(getText('lesson-count-0')).toBe('Lessons: 1');
  });

  it('should add a second module to the nested structure', () => {
    click('add-module-btn');

    expect(host.querySelector('[data-testid="module-input-1"]')).toBeTruthy();
    expect(getText('module-count')).toBe('Modules: 2');
  });

  it('should add a second lesson inside the first module', () => {
    click('add-lesson-0');

    expect(host.querySelector('[data-testid="lesson-input-0-1"]')).toBeTruthy();
    expect(getText('lesson-count-0')).toBe('Lessons: 2');
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
});
