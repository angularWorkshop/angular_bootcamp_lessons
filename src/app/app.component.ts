import { Component, signal } from '@angular/core';

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
