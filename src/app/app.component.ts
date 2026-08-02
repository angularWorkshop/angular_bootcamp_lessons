import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [FormsModule],
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
    // TODO: validate the fields, link the errors to aria-describedby, update the live region,
    // and remember the first invalid field id for focus-first-error behavior.
  }
}
