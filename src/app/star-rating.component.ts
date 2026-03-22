import { Component, computed, model } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  template: `
    <div class="stars" data-testid="star-rating">
      @for (star of stars(); track star) {
        <button
          class="star"
          [class.star--filled]="star <= rating()"
          [attr.data-testid]="'star-' + star"
          (click)="rating.set(star)"
        >
          {{ star <= rating() ? '★' : '☆' }}
        </button>
      }
    </div>
  `,
})
export class StarRatingComponent {
  readonly rating = model(0);
  protected readonly stars = computed(() =>
    Array.from({ length: 5 }, (_, i) => i + 1),
  );
}
