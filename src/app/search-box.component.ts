import { Component, viewChild, ElementRef, output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  standalone: true,
  template: `
    <div class="search-box" data-testid="search-box">
      <input
        #searchInput
        data-testid="search-input"
        placeholder="Type to search..."
        (input)="onInput($event)"
      />
      <button data-testid="focus-btn" (click)="focusInput()">Focus</button>
      <button data-testid="clear-btn" (click)="clearAndFocus()">Clear &amp; Focus</button>
    </div>
  `,
})
export class SearchBoxComponent {
  searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  queryChange = output<string>();

  focusInput(): void {
    this.searchInput().nativeElement.focus();
  }

  clearAndFocus(): void {
    const input = this.searchInput().nativeElement;
    input.value = '';
    this.queryChange.emit('');
    input.focus();
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.queryChange.emit(value);
  }
}
