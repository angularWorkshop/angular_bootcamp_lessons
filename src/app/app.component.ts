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

  // TODO: реализуй метод — переключай user.isOnline между true и false
  toggleOnlineStatus(): void {}

  // TODO: реализуй метод — переводи роль по цепочке:
  // 'Junior Developer' → 'Middle Developer' → 'Senior Developer'
  // на 'Senior Developer' застываем
  promote(): void {}
}
