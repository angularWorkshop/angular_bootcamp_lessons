import { Component, signal } from '@angular/core';

// TODO: Import StarRatingComponent and ToggleComponent, add to imports

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly userRating = signal(0);
  protected readonly recommend = signal(false);

  protected reset(): void {
    this.userRating.set(0);
    this.recommend.set(false);
  }
}
