import { Component, signal } from '@angular/core';
import { StarRatingComponent } from './star-rating.component';
import { ToggleComponent } from './toggle.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [StarRatingComponent, ToggleComponent],
})
export class AppComponent {
  protected readonly userRating = signal(0);
  protected readonly recommend = signal(false);

  protected reset(): void {
    this.userRating.set(0);
    this.recommend.set(false);
  }
}
