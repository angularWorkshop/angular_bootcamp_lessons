import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected successMessage = '';

  protected readonly inviteForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    role: ['', Validators.required],
    urgent: [false],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  protected submitInvite(): void {
    if (this.inviteForm.invalid) {
      this.inviteForm.markAllAsTouched();
      return;
    }

    const { name, role, urgent } = this.inviteForm.getRawValue();
    const suffix = urgent ? ' (urgent)' : '';

    this.successMessage = `${name} invited as ${role}${suffix}`;
  }
}
