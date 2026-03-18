import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Order Counter';
  protected readonly count = signal(0);

  protected readonly doubled = computed(() => this.count() * 2);

  protected readonly status = computed(() => {
    const currentValue = this.count();

    return currentValue === 0 ? 'No orders yet' : `Active orders: ${currentValue}`;
  });

  protected increase(): void {
    this.count.update(value => value + 1);
  }

  protected decrease(): void {
    this.count.update(value => Math.max(0, value - 1));
  }
}
