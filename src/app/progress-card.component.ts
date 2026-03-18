import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-card',
  template: `
    <section class="progress-card">
      <p class="progress-card__eyebrow">Progress Card</p>
      <p class="progress-card__title" data-testid="progress-text">
        Completed {{ progress.completedLessons }} of {{ progress.totalLessons }} lessons
      </p>
      <p class="progress-card__percent" data-testid="progress-percent">
        {{ progress.completedLessons / progress.totalLessons * 100 }}% complete
      </p>
    </section>
  `,
  styles: [
    `
      .progress-card {
        display: grid;
        gap: 0.5rem;
        padding: 1.1rem;
        background: linear-gradient(180deg, rgba(18, 32, 24, 0.96), rgba(8, 20, 14, 0.96));
        border: 1px solid rgba(74, 222, 128, 0.14);
        border-radius: 1rem;
      }

      .progress-card__eyebrow,
      .progress-card__title,
      .progress-card__percent {
        margin: 0;
      }

      .progress-card__eyebrow {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #86efac;
      }

      .progress-card__title {
        font-size: 1.25rem;
        font-weight: 800;
        color: #f0fdf4;
      }

      .progress-card__percent {
        font-size: 0.95rem;
        color: #d1fae5;
      }
    `,
  ],
})
export class ProgressCardComponent {
  @Input({ required: true }) public progress!: {
    completedLessons: number;
    totalLessons: number;
  };
}
