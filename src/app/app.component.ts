import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Order Counter';
  protected readonly count = signal(0);

  // TODO: make this computed value depend on count
  protected readonly doubled = computed(() => 0);

  // TODO: update the status based on count
  protected readonly status = computed(() => 'No orders yet');

  protected increase(): void {
    // TODO: increase count by 1
  }

  protected decrease(): void {
    // TODO: decrease count by 1, but never go below zero
  }
}
