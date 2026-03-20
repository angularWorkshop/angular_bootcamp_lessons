import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="home-title">Home</h2>
      <p class="page__text" data-testid="home-text">Welcome to the app!</p>
    </section>
  `,
})
export class HomeComponent {}
