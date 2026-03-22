import { Component, signal } from '@angular/core';

// TODO: Import SearchBoxComponent, add to imports

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly query = signal('');

  protected onQueryChange(value: string): void {
    this.query.set(value);
  }
}
