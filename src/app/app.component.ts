import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmailReservationService } from './email-reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Early Access Email Gate';
  protected readonly signupForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });
  private emailCheckTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private reservationSub: Subscription | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly emailReservationService: EmailReservationService,
  ) {
    this.setupEmailAvailabilityCheck();
  }

  protected get emailControl() {
    return this.signupForm.controls.email;
  }

  private setupEmailAvailabilityCheck(): void {
    this.emailControl.valueChanges.subscribe((value) => {
      this.clearPendingCheck();

      if (!value || this.emailControl.hasError('required') || this.emailControl.hasError('email')) {
        return;
      }

      this.emailControl.markAsPending();

      this.emailCheckTimeoutId = setTimeout(() => {
        this.reservationSub = this.emailReservationService.isTaken(value.trim()).subscribe((isTaken) => {
          this.emailControl.setErrors(isTaken ? { emailTaken: true } : null);
        });
      }, 300);
    });
  }

  private clearPendingCheck(): void {
    if (this.emailCheckTimeoutId) {
      clearTimeout(this.emailCheckTimeoutId);
      this.emailCheckTimeoutId = null;
    }

    this.reservationSub?.unsubscribe();
    this.reservationSub = null;
  }
}
