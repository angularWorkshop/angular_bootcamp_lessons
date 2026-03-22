import { Component } from '@angular/core';

// TODO: Import model, computed from '@angular/core'

@Component({
  selector: 'app-star-rating',
  standalone: true,
  template: `
    <!-- TODO: Implement star rating template -->
    <!-- 5 star buttons: data-testid="star-1" through data-testid="star-5" -->
    <!-- Filled stars have class "star--filled" -->
    <!-- Click on star sets rating to that star's number -->
    <div class="stars" data-testid="star-rating">
      <p>TODO: implement star rating</p>
    </div>
  `,
})
export class StarRatingComponent {
  // TODO: Declare rating = model(0)
  // TODO: Add stars = computed(() => Array.from({ length: 5 }, (_, i) => i + 1))
}
