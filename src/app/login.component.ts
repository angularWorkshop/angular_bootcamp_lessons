import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="login-title">Login</h2>
      <p class="page__text">You need to log in to access protected pages.</p>
      <button type="button" data-testid="login-button" (click)="doLogin()">Log in</button>
    </section>
  `,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected doLogin(): void {
    this.auth.login();
    this.router.navigate(['/admin']);
  }
}
