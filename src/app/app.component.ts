import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected query = 'an';

  protected readonly snippets: string[] = [
    'Angular Signals reduce template noise.',
    'Standalone APIs help feature isolation.',
    'Advanced state transitions need observability.',
  ];

  protected setQuery(value: string): void {
    this.query = value.trim();
  }
}
