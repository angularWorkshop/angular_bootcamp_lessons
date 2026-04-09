import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly secondaryVisible = signal(false);
  protected readonly budgetStatus = computed(() => this.secondaryVisible() ? 'extended' : 'primary-only');

  protected showSecondary(): void {
    this.secondaryVisible.set(true);
  }
}
