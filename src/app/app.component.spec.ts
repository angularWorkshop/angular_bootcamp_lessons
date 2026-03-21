import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    service = fixture.debugElement.injector.get(EmailReservationService);
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

  it('should debounce validation and only call the reservation service for the latest email', async () => {
    const reservationSpy = jest.spyOn(service, 'isTaken').mockReturnValue(of(false));

    fillInput('first@example.com');
    await wait(180);
    fillInput('second@example.com');
    await wait(180);

    expect(reservationSpy).not.toHaveBeenCalled();

    await wait(160);

    expect(reservationSpy).toHaveBeenCalledTimes(1);
    expect(reservationSpy).toHaveBeenCalledWith('second@example.com');
  });

  it('should expose the pending status and then the taken-email error', async () => {
    jest.spyOn(service, 'isTaken').mockReturnValue(of(true).pipe(delay(100)));

    fillInput('reserved@workshop.dev');
    await wait(320);
    fixture.detectChanges();

    expect(getText('status-label')).toBe('Status: PENDING');
    expect(getText('checking-state')).toBe('Checking email availability...');

    await wait(120);
    fixture.detectChanges();

    expect(getText('status-label')).toBe('Status: INVALID');
    expect(getText('email-taken-error')).toBe('This email is already reserved.');
  });

  it('should accept an available email and enable submit after async validation finishes', async () => {
    jest.spyOn(service, 'isTaken').mockReturnValue(of(false).pipe(delay(100)));

    fillInput('free@workshop.dev');
    await wait(420);
    fixture.detectChanges();

    const submitButton = host.querySelector('[data-testid="submit-btn"]') as HTMLButtonElement | null;

    expect(getText('status-label')).toBe('Status: VALID');
    expect(getText('available-state')).toBe('Email is available.');
    expect(submitButton?.disabled).toBe(false);
  });

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

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
});
