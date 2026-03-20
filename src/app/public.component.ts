import { Component } from '@angular/core';

@Component({
  selector: 'app-public',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="public-title">Public Page</h2>
      <p class="page__text">This page is accessible to everyone.</p>
    </section>
  `,
})
export class PublicComponent {}
