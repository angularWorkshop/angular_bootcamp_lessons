import { Component, input, computed } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div class="card" data-testid="user-card">
      <div class="card__avatar" data-testid="initials">{{ initials() }}</div>
      <div class="card__info">
        <h3 class="card__name" data-testid="full-name">{{ fullName() }}</h3>
        @if (showEmail()) {
          <p class="card__email" data-testid="email">{{ user().email }}</p>
        }
        <span class="card__role" data-testid="role-label">{{ roleLabel() }}</span>
      </div>
    </div>
  `,
})
export class UserCardComponent {
  user = input.required<User>();
  showEmail = input(true);

  fullName = computed(() => {
    const u = this.user();
    return `${u.firstName} ${u.lastName}`;
  });

  initials = computed(() => {
    const u = this.user();
    return `${u.firstName[0]}${u.lastName[0]}`.toUpperCase();
  });

  roleLabel = computed(() => {
    const role = this.user().role;
    return role.charAt(0).toUpperCase() + role.slice(1);
  });
}
