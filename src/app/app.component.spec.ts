import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the preview heading and initial placeholders', () => {
    expect(getText('preview-title')).toBe('Profile Preview Studio');
    expect(getText('preview-name')).toBe('Name: Awaiting full name');
    expect(getText('preview-city')).toBe('City: Awaiting city');
    expect(getText('preview-format')).toBe('Format: Awaiting format');
    expect(getText('preview-goal')).toBe('Goal: Awaiting learning goal');
  });

  it('should sync the full name input with the draft model and preview', () => {
    fillInput('draft-name-input', 'Denis Svirko');

    expect((fixture.componentInstance as any)['profileDraft'].fullName).toBe('Denis Svirko');
    expect(getText('preview-name')).toBe('Name: Denis Svirko');
  });

  it('should sync the city and learning goal fields with the preview', () => {
    fillInput('draft-city-input', 'Minsk');
    fillTextarea('draft-goal-input', 'Build stronger Angular architecture skills.');

    expect((fixture.componentInstance as any)['profileDraft'].city).toBe('Minsk');
    expect((fixture.componentInstance as any)['profileDraft'].learningGoal).toBe(
      'Build stronger Angular architecture skills.',
    );
    expect(getText('preview-city')).toBe('City: Minsk');
    expect(getText('preview-goal')).toBe('Goal: Build stronger Angular architecture skills.');
  });

  it('should sync the selected format with the draft model and preview', () => {
    selectValue('draft-format-select', 'Workshop');

    expect((fixture.componentInstance as any)['profileDraft'].preferredFormat).toBe('Workshop');
    expect(getText('preview-format')).toBe('Format: Workshop');
  });

  it('should restore placeholders when bound fields are cleared again', () => {
    fillInput('draft-name-input', 'Denis Svirko');
    fillTextarea('draft-goal-input', 'Build stronger Angular architecture skills.');

    fillInput('draft-name-input', '');
    fillTextarea('draft-goal-input', '');

    expect(getText('preview-name')).toBe('Name: Awaiting full name');
    expect(getText('preview-goal')).toBe('Goal: Awaiting learning goal');
  });

  function fillInput(testId: string, value: string): void {
    const input = host.querySelector(`[data-testid="${testId}"]`) as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function fillTextarea(testId: string, value: string): void {
    const textarea = host.querySelector(`[data-testid="${testId}"]`) as HTMLTextAreaElement | null;

    expect(textarea).toBeTruthy();
    if (textarea) {
      textarea.value = value;
      textarea.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function selectValue(testId: string, value: string): void {
    const select = host.querySelector(`[data-testid="${testId}"]`) as HTMLSelectElement | null;

    expect(select).toBeTruthy();
    if (select) {
      select.value = value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
    }
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
