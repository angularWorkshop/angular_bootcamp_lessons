import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface EnrollmentPayload {
  fullName: string;
  email: string;
  learningTrack: 'Frontend' | 'Architecture' | 'Testing';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Template Validation Lab';
  protected submittedEnrollment: EnrollmentPayload | null = null;

  protected saveEnrollment(form: NgForm): void {
    // TODO: prevent invalid form submission and store the valid enrollment payload
  }
}
