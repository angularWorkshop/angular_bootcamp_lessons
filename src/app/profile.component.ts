import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="profile-title">Profile</h2>
      <p class="page__text">Your personal information.</p>
    </section>
  `,
})
export class ProfileComponent {}
