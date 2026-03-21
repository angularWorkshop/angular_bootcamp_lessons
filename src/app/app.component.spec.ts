import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, delay } from 'rxjs';
import { AppComponent } from './app.component';
import { EmailReservationService } from './email-reservation.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let host: HTMLElement;
  let service: EmailReservationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    service = TestBed.inject(EmailReservationService);
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the async validator heading and keep submit disabled initially', () => {
    const submitButton = host.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement | null;

    expect(getText('email-title')).toBe('Early Access Email Gate');
    expect(getText('status-label')).toBe('Status: INVALID');
    expect(submitButton?.disabled).toBe(true);
  });

  it('should debounce validation and only call the reservation service for the latest email', fakeAsync(() => {
    const reservationSpy = jest.spyOn(service, 'isTaken').mockReturnValue(of(false));

    fillInput('first@example.com');
    tick(150);
    fillInput('second@example.com');
    tick(150);

    expect(reservationSpy).not.toHaveBeenCalled();

    tick(150);

    expect(reservationSpy).toHaveBeenCalledTimes(1);
    expect(reservationSpy).toHaveBeenCalledWith('second@example.com');
  }));

  it('should expose the pending status and then the taken-email error', fakeAsync(() => {
    jest.spyOn(service, 'isTaken').mockReturnValue(of(true).pipe(delay(100)));

    fillInput('reserved@workshop.dev');
    tick(300);
    fixture.detectChanges();

    expect(getText('status-label')).toBe('Status: PENDING');
    expect(getText('checking-state')).toBe('Checking email availability...');

    tick(100);
    fixture.detectChanges();

    expect(getText('status-label')).toBe('Status: INVALID');
    expect(getText('email-taken-error')).toBe('This email is already reserved.');
  }));

  it('should accept an available email and enable submit after async validation finishes', fakeAsync(() => {
    jest.spyOn(service, 'isTaken').mockReturnValue(of(false).pipe(delay(100)));

    fillInput('free@workshop.dev');
    tick(400);
    fixture.detectChanges();

    const submitButton = host.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement | null;

    expect(getText('status-label')).toBe('Status: VALID');
    expect(getText('available-state')).toBe('Email is available.');
    expect(submitButton?.disabled).toBe(false);
  }));

  function fillInput(value: string): void {
    const input = host.querySelector('[data-testid="email-input"]') as HTMLInputElement | null;

    expect(input).toBeTruthy();
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }
  }

  function getText(testId: string): string {
    const element = host.querySelector(`[data-testid="${testId}"]`);

    expect(element).toBeTruthy();
    return element?.textContent?.trim() ?? '';
  }
});
