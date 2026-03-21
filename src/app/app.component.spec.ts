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

  it('should render the reactive forms heading and intro copy', () => {
    expect(getText('release-title')).toBe('Release Brief Studio');
    expect(getText('field-count')).toContain('Controls:');
  });

  it('should render preview placeholders before the form is filled', () => {
    expect(getText('preview-name')).toBe('Release: Awaiting release name');
    expect(getText('preview-owner')).toBe('Owner: Awaiting owner');
  });

  it('should render the reactive form once the FormGroup contains all required controls', () => {
    expect(host.querySelector('[data-testid="release-form"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="missing-form-state"]')).toBeNull();
  });

  it('should expose three controls and the default environment preview', () => {
    expect(getText('field-count')).toBe('Controls: 3');
    expect(getText('preview-environment')).toBe('Environment: staging');
  });

  it('should update the preview when the reactive form values change', () => {
    fillInput('release-name-input', 'Q2 Readiness');
    fillInput('owner-input', 'Release Council');
    selectValue('environment-select', 'production');

    expect(getText('preview-name')).toBe('Release: Q2 Readiness');
    expect(getText('preview-owner')).toBe('Owner: Release Council');
    expect(getText('preview-environment')).toBe('Environment: production');
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
