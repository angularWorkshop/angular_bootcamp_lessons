import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,
    AppComponent
  ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should render errors, aria links, and the first invalid field on submit', () => {
    submitForm();
    fixture.detectChanges();
    expect(getText('name-error')).toBe('Name is required.');
    expect(getText('email-error')).toBe('Enter a valid email.');
    expect(getAttr('name-input', 'aria-describedby')).toBe('name-error');
    expect(getText('focus-target')).toBe('name');
    expect(getText('live-region')).toBe('Fix the highlighted fields before submitting.');
  });

  it('should clear the errors and show success after a valid submit', () => {
    setInput('name-input', 'Mia');
    setInput('email-input', 'mia@example.com');
    submitForm();
    fixture.detectChanges();
    expect(query('name-error')).toBeNull();
    expect(query('email-error')).toBeNull();
    expect(getText('success-state')).toBe('Profile saved.');
    expect(getText('focus-target')).toBe('none');
  });

  function setInput(testId: string, value: string): void {
    const input = query(testId) as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function submitForm(): void {
    const form = query('profile-form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
  }

  function getText(testId: string): string {
    const element = query(testId);
    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }

  function getAttr(testId: string, attr: string): string | null {
    return query(testId)?.getAttribute(attr) ?? null;
  }

  function query(testId: string): HTMLElement | null {
    return host.querySelector(`[data-testid="${testId}"]`);
  }
});
