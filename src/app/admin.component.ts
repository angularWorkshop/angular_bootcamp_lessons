import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="admin-title">Admin Panel</h2>
      <p class="page__text">Welcome to the admin area.</p>
      <button type="button" data-testid="logout-button" (click)="doLogout()">Log out</button>
    </section>
  `,
})
export class AdminComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected doLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
