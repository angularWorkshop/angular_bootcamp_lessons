import { Component } from '@angular/core';

// TODO: Import input, computed from '@angular/core'
// TODO: Import User from './user.model'

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <!-- TODO: Implement the card template -->
    <!-- Avatar with initials: data-testid="initials" -->
    <!-- Full name: data-testid="full-name" -->
    <!-- Email (conditionally shown): data-testid="email" -->
    <!-- Role badge: data-testid="role-label" -->
    <div class="card" data-testid="user-card">
      <p>TODO: implement user card</p>
    </div>
  `,
})
export class UserCardComponent {
  // TODO: Declare user = input.required<User>()
  // TODO: Declare showEmail = input(true)
  // TODO: Add fullName = computed(() => ...)
  // TODO: Add initials = computed(() => ...) — first letters of firstName and lastName, uppercased
  // TODO: Add roleLabel = computed(() => ...) — 'admin' -> 'Admin', 'editor' -> 'Editor', 'viewer' -> 'Viewer'
}
