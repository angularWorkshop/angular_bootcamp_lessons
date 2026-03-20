import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, USERS } from './user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  template: `
    <section class="page">
      @if (user) {
        <h2 class="page__title" data-testid="detail-name">{{ user.name }}</h2>
        <p class="page__text" data-testid="detail-email">{{ user.email }}</p>
      } @else {
        <p class="page__text" data-testid="not-found">User not found</p>
      }

      <!-- TODO: Add a click handler that navigates back to the user list using Router.navigate() -->
      <button type="button" data-testid="back-button">Back to list</button>
    </section>
  `,
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // TODO: Read the 'id' param from the route and find the matching user
  protected user: User | undefined;

  protected goBack(): void {
    // TODO: Use this.router.navigate() to go back to '/users'
  }
}
