import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Accessible Profile Form';
  protected readonly form = { name: '', email: '' };
  protected readonly errors = { name: '', email: '' };
  protected liveMessage = 'Ready to submit the profile form.';
  protected firstInvalidFieldId = 'none';
  protected submitSuccess = false;

  protected submit(): void {
    this.errors.name = this.form.name.trim() ? '' : 'Name is required.';
    this.errors.email = /.+@.+\..+/.test(this.form.email.trim()) ? '' : 'Enter a valid email.';
    this.submitSuccess = !this.errors.name && !this.errors.email;
    this.firstInvalidFieldId = this.errors.name ? 'name' : this.errors.email ? 'email' : 'none';
    this.liveMessage = this.submitSuccess ? 'Profile saved.' : 'Fix the highlighted fields before submitting.';
  }
}
