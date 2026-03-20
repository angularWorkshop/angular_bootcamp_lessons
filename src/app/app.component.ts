import { Component } from '@angular/core';

type Role = 'Junior Developer' | 'Middle Developer' | 'Senior Developer';

interface UserProfile {
  fullName: string;
  role: Role;
  city: string;
  isOnline: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected user: UserProfile = {
    fullName: 'Annie Case',
    role: 'Junior Developer',
    city: 'Minsk',
    isOnline: false,
  };

  toggleOnlineStatus(): void {
    this.user.isOnline = !this.user.isOnline;
  }

  promote(): void {
    if (this.user.role === 'Junior Developer') {
      this.user.role = 'Middle Developer';
    } else if (this.user.role === 'Middle Developer') {
      this.user.role = 'Senior Developer';
    }
  }
}
