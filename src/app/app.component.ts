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
    this.filtersOpen = true;
    this.focusTarget = 'filters-search';
  }

  protected applyFilters(): void {
    this.filtersOpen = false;
    this.liveMessage = 'Showing the filtered results.';
    this.focusTarget = 'results-heading';
  }

  protected cancelFilters(): void {
    this.filtersOpen = false;
    this.liveMessage = 'Filters closed without changes.';
    this.focusTarget = 'open-filters';
  }
}
