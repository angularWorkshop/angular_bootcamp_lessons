import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { EmailReservationService } from './email-reservation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Early Access Email Gate';
  protected readonly signupForm = this.formBuilder.nonNullable.group({
    email: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.uniqueEmailValidator()],
    }),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly emailReservationService: EmailReservationService,
  ) {}

  protected get emailControl() {
    return this.signupForm.controls.email;
  }

  private uniqueEmailValidator(): AsyncValidatorFn {
    return (_control: AbstractControl): Observable<Record<string, true> | null> => {
      // TODO: implement debounce, cancellation, and the async email reservation check
      return of(null);
    };
  }
}
