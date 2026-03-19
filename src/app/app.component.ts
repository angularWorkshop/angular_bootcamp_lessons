import { Component } from '@angular/core';

interface UserProfile {
  fullName: string;
  role: string;
  city: string;
  email: string;
  avatarUrl: string;
  isOnline: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'User Profile Card';
  protected readonly user: UserProfile = {
    fullName: 'Annie Case',
    role: 'Angular Student',
    city: 'Minsk',
    email: 'annie.case@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  };
}
