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

  it('should render the validation heading and submit button', () => {
    expect(getText('validation-title')).toBe('Template Validation Lab');
    expect(getText('submit-enrollment-btn')).toBe('Submit enrollment');
  });

  it('should show the empty state initially', () => {
    expect(host.querySelector('[data-testid="empty-state"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="submitted-state"]')).toBeNull();
  });

  it('should hide validation messages before interaction', () => {
    expect(host.querySelector('[data-testid="full-name-required-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="full-name-minlength-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="email-required-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="email-invalid-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="track-required-error"]')).toBeNull();
  });

  it('should keep submit disabled while the form is invalid', () => {
    const submitButton = host.querySelector('[data-testid="submit-enrollment-btn"]') as HTMLButtonElement | null;

    expect(submitButton).toBeTruthy();
    expect(submitButton?.disabled).toBe(true);
  });

  it('should show required validation errors after submit on an empty form', () => {
    submitForm();

    expect(getText('full-name-required-error')).toBe('Full name is required.');
    expect(getText('email-required-error')).toBe('Email is required.');
    expect(getText('track-required-error')).toBe('Choose a learning track.');
  });

  it('should show minlength and invalid email errors for touched invalid fields', () => {
    fillInput('full-name-input', 'Al');
    blur('full-name-input');
    fillInput('email-input', 'wrong-email');
    blur('email-input');

    expect(getText('full-name-minlength-error')).toBe('Full name must be at least 3 characters.');
    expect(getText('email-invalid-error')).toBe('Enter a valid email address.');
  });

  it('should enable submit, hide errors, and save the enrollment after valid input', () => {
    fillInput('full-name-input', 'Denis Svirko');
    blur('full-name-input');
    fillInput('email-input', 'denis@example.com');
    blur('email-input');
    selectValue('track-select', 'Architecture');

    const submitButton = host.querySelector('[data-testid="submit-enrollment-btn"]') as HTMLButtonElement | null;
    expect(submitButton?.disabled).toBe(false);

    expect(host.querySelector('[data-testid="full-name-required-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="full-name-minlength-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="email-required-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="email-invalid-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="track-required-error"]')).toBeNull();

    submitForm();

    expect(getText('submitted-name')).toBe('Name: Denis Svirko');
    expect(getText('submitted-email')).toBe('Email: denis@example.com');
    expect(getText('submitted-track')).toBe('Track: Architecture');
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

  function blur(testId: string): void {
    const input = host.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null;

    expect(input).toBeTruthy();
    input?.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
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

  function submitForm(): void {
    const form = host.querySelector('[data-testid="enrollment-form"]') as HTMLFormElement | null;

    expect(form).toBeTruthy();
    form?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
