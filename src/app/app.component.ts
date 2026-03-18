import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Preferences Sync';
  protected readonly storageKey = 'preferences-sync';
  protected readonly theme = signal<'light' | 'dark'>('light');
  protected readonly compactMode = signal(false);

  constructor() {
    // TODO: sync theme and compactMode to document.title and localStorage with effect()
    effect(() => {});
  }

  protected toggleTheme(): void {
    this.theme.update(value => (value === 'light' ? 'dark' : 'light'));
  }

  protected toggleCompactMode(): void {
    this.compactMode.update(value => !value);
  }

  protected currentTitleLabel(): string {
    return this.theme() === 'light' ? 'Light mode' : 'Dark mode';
  }

  protected compactModeLabel(): string {
    return this.compactMode() ? 'Compact mode: On' : 'Compact mode: Off';
  }
}
