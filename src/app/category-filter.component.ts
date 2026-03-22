import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  template: `
    <div class="filter" data-testid="filter">
      @for (cat of categories(); track cat) {
        <button
          class="filter__btn"
          [attr.data-testid]="'category-' + cat"
          (click)="selected.emit(cat)"
        >
          {{ cat }}
        </button>
      }
      <button
        class="filter__clear-btn"
        data-testid="clear-btn"
        (click)="cleared.emit()"
      >
        Clear
      </button>
    </div>
  `,
})
export class CategoryFilterComponent {
  categories = input.required<string[]>();
  selected = output<string>();
  cleared = output();
}
