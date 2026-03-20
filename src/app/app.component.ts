import { Component } from '@angular/core';

interface ProfileDraft {
  fullName: string;
  city: string;
  preferredFormat: 'Video' | 'Workshop' | 'Mentorship' | '';
  learningGoal: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Profile Preview Studio';
  protected profileDraft: ProfileDraft = {
    fullName: '',
    city: '',
    preferredFormat: '',
    learningGoal: '',
  };

  protected get previewName(): string {
    return this.profileDraft.fullName || 'Awaiting full name';
  }

  protected get previewCity(): string {
    return this.profileDraft.city || 'Awaiting city';
  }

  protected get previewFormat(): string {
    return this.profileDraft.preferredFormat || 'Awaiting format';
  }

  protected get previewGoal(): string {
    return this.profileDraft.learningGoal || 'Awaiting learning goal';
  }
}
