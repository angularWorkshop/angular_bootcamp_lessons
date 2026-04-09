import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = 'Filters and Results Focus Flow';
  protected filtersOpen = false;
  protected liveMessage = 'Results are ready.';
  protected focusTarget = 'open-filters';

  protected openFilters(): void {
    // TODO: open the filters panel and move the focus target inside it.
  }

  protected applyFilters(): void {
    // TODO: close the panel, announce the updated results, and move focus to the results heading.
  }

  protected cancelFilters(): void {
    // TODO: close the panel and restore focus to the button that reopens filters.
  }
}
