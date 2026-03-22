import { Component } from '@angular/core';

// TODO: Import input, output from '@angular/core'

@Component({
  selector: 'app-category-filter',
  standalone: true,
  template: `
    <!-- TODO: Implement the filter template -->
    <!-- Button for each category: data-testid="category-{name}" -->
    <!-- Clear button: data-testid="clear-btn" -->
    <div class="filter" data-testid="filter">
      <p>TODO: implement category filter</p>
    </div>
  `,
})
export class CategoryFilterComponent {
  // TODO: Declare categories = input.required<string[]>()
  // TODO: Declare selected = output<string>() — emits selected category name
  // TODO: Declare cleared = output() — emits when filter is cleared
}
