import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface UserProfilePayload {
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
  protected readonly title = 'Legacy User Form';
  protected submittedProfile: UserProfilePayload | null = null;

  protected saveProfile(form: NgForm): void {
    this.submittedProfile = form.value as UserProfilePayload;
  }
}
