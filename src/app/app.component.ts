import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface HandoverPayload {
  handoverReason: string;
  replacementEngineer: string;
  contactEmail: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'On-Call Handover Request';
  protected readonly handoverForm = this.formBuilder.nonNullable.group({
    handoverReason: ['', [Validators.required, Validators.minLength(12)]],
    replacementEngineer: ['', [Validators.required]],
    contactEmail: ['', [Validators.required, Validators.email]],
  });
  protected submitted = false;
  protected savedHandover: HandoverPayload | null = null;

  constructor(private readonly formBuilder: FormBuilder) {}

  protected submitRequest(): void {
    this.submitted = true;

    if (this.handoverForm.invalid) {
      this.handoverForm.markAllAsTouched();
      return;
    }

    this.savedHandover = this.handoverForm.getRawValue();
  }

  protected shouldShowError(
    controlName: 'handoverReason' | 'replacementEngineer' | 'contactEmail',
    errorKey: string,
  ): boolean {
    const control = this.handoverForm.controls[controlName];

    return control.hasError(errorKey) && (control.touched || this.submitted);
  }
}
