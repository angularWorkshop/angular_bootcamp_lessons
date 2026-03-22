import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <!-- TODO: split projection into [card-header], [card-body], [card-footer] -->
      <ng-content></ng-content>
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
