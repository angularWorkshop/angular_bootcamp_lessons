import { Component, signal, computed } from '@angular/core';
import { CategoryFilterComponent } from './category-filter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CategoryFilterComponent],
})
export class AppComponent {
  protected readonly categories = ['Electronics', 'Books', 'Clothing', 'Sports'];

  protected readonly selectedCategory = signal<string | null>(null);
  protected readonly filterChangeCount = signal(0);

  protected readonly displayCategory = computed(() =>
    this.selectedCategory() ?? 'All products'
  );

  protected onCategorySelected(category: string): void {
    this.selectedCategory.set(category);
    this.filterChangeCount.update(c => c + 1);
  }

  protected onFilterCleared(): void {
    this.selectedCategory.set(null);
    this.filterChangeCount.update(c => c + 1);
  }
}
