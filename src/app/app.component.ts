import { Component, signal } from '@angular/core';
import { SearchBoxComponent } from './search-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [SearchBoxComponent],
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly query = signal('');

  protected onQueryChange(value: string): void {
    this.query.set(value);
  }
}
