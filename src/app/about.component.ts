import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="about-title">About</h2>
      <p class="page__text" data-testid="about-text">This is the about page.</p>
    </section>
  `,
})
export class AboutComponent {}
