import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section class="page">
      <h2 class="page__title" data-testid="contact-title">Contact</h2>
      <p class="page__text" data-testid="contact-text">Get in touch with us.</p>
    </section>
  `,
})
export class ContactComponent {}
