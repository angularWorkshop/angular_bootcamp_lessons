import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <header data-testid="card-header-slot">
        <ng-content select="[card-header]"></ng-content>
      </header>
      <section data-testid="card-body-slot">
        <ng-content select="[card-body]"></ng-content>
      </section>
      <footer data-testid="card-footer-slot">
        <ng-content select="[card-footer]"></ng-content>
      </footer>
    </article>
  `,
  styles: [
    `
      .card {
        border: 1px solid #cbd5e1;
        background: #ffffff;
        border-radius: 12px;
        padding: 0.85rem 1rem;
      }
    `,
  ],
})
export class AppCardComponent {}
