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

      <button type="button" data-testid="back-button" (click)="goBack()">Back to list</button>
    </section>
  `,
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected user: User | undefined;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = USERS.find((u) => u.id === id);
  }

  protected goBack(): void {
    this.router.navigate(['/users']);
  }
}
