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

  it('should render the legacy form heading and submit button', () => {
    expect(getText('form-title')).toBe('Legacy User Form');
    expect(getText('submit-profile-btn')).toBe('Submit profile');
  });

  it('should show the empty submitted state initially', () => {
    expect(host.querySelector('[data-testid="empty-state"]')).toBeTruthy();
    expect(host.querySelector('[data-testid="submitted-state"]')).toBeNull();
  });

  it('should store the submitted profile payload after form submit', () => {
    fillInput('full-name-input', 'Denis Svirko');
    fillInput('email-input', 'denis@example.com');
    selectValue('track-select', 'Architecture');

    submitForm();

    expect((fixture.componentInstance as any)['submittedProfile']).toEqual({
      fullName: 'Denis Svirko',
      email: 'denis@example.com',
      learningTrack: 'Architecture',
    });
  });

  it('should render the submitted profile summary after submit', () => {
    fillInput('full-name-input', 'Denis Svirko');
    fillInput('email-input', 'denis@example.com');
    selectValue('track-select', 'Architecture');

    submitForm();

    expect(getText('submitted-name')).toBe('Name: Denis Svirko');
    expect(getText('submitted-email')).toBe('Email: denis@example.com');
    expect(getText('submitted-track')).toBe('Track: Architecture');
  });

  it('should replace the previous payload on the next submit', () => {
    fillInput('full-name-input', 'Denis Svirko');
    fillInput('email-input', 'denis@example.com');
    selectValue('track-select', 'Architecture');
    submitForm();

    fillInput('full-name-input', 'Angular Mentor');
    fillInput('email-input', 'mentor@example.com');
    selectValue('track-select', 'Testing');
    submitForm();

    expect(getText('submitted-name')).toBe('Name: Angular Mentor');
    expect(getText('submitted-email')).toBe('Email: mentor@example.com');
    expect(getText('submitted-track')).toBe('Track: Testing');
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

  function submitForm(): void {
    const form = host.querySelector('[data-testid="user-form"]') as HTMLFormElement | null;

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
