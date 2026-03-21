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

  it('should render the error UX heading, keep errors hidden at first, and block submit', () => {
    const submitButton = host.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement | null;

    expect(getText('handover-title')).toBe('On-Call Handover Request');
    expect(host.querySelector('[data-testid="reason-required-error"]')).toBeNull();
    expect(host.querySelector('[data-testid="email-required-error"]')).toBeNull();
    expect(submitButton?.disabled).toBe(true);
  });

  it('should show required errors after an invalid submit attempt', () => {
    submitForm();

    expect(getText('reason-required-error')).toBe('Handover reason is required.');
    expect(getText('replacement-required-error')).toBe('Replacement engineer is required.');
    expect(getText('email-required-error')).toBe('Contact email is required.');
  });

  it('should show field-specific errors after invalid interaction', () => {
    fillInput('handover-reason-input', 'Too short');
    blur('handover-reason-input');
    fillInput('contact-email-input', 'wrong-email');
    blur('contact-email-input');

    expect(getText('reason-minlength-error')).toBe('Handover reason must be at least 12 characters.');
    expect(getText('email-invalid-error')).toBe('Enter a valid email address.');
  });

  it('should enable submit and save the handover once the form becomes valid', () => {
    fillInput('handover-reason-input', 'Need coverage during the maintenance window.');
    blur('handover-reason-input');
    fillInput('replacement-input', 'Denis Svirko');
    blur('replacement-input');
    fillInput('contact-email-input', 'ops@example.com');
    blur('contact-email-input');
    fixture.detectChanges();

    const submitButton = host.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement | null;
    expect(submitButton?.disabled).toBe(false);

    submitForm();

    expect(getText('saved-reason')).toBe('Reason: Need coverage during the maintenance window.');
    expect(getText('saved-replacement')).toBe('Replacement: Denis Svirko');
    expect(getText('saved-email')).toBe('Contact: ops@example.com');
  });

  function fillInput(testId: string, value: string): void {
    const input = host.querySelector(`[data-testid="${testId}"]`) as HTMLInputElement | HTMLTextAreaElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function blur(testId: string): void {
    const element = host.querySelector(`[data-testid="${testId}"]`) as HTMLElement | null;

    expect(element).toBeTruthy();
    element?.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  function submitForm(): void {
    const form = host.querySelector('[data-testid="handover-form"]') as HTMLFormElement | null;

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
