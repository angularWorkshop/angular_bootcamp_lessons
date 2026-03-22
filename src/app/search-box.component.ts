import { Component } from '@angular/core';

// TODO: Import viewChild, ElementRef, output from '@angular/core'

@Component({
  selector: 'app-search-box',
  standalone: true,
  template: `
    <!-- TODO: Implement search box template -->
    <!-- Input: #searchInput, data-testid="search-input", placeholder="Type to search..." -->
    <!-- Bind (input) event to update query via onInput($event) -->
    <!-- Button: data-testid="focus-btn", text "Focus", click calls focusInput() -->
    <!-- Button: data-testid="clear-btn", text "Clear & Focus", click calls clearAndFocus() -->
    <div class="search-box" data-testid="search-box">
      <p>TODO: implement search box</p>
    </div>
  `,
})
export class SearchBoxComponent {
  // TODO: Declare searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput')
  // TODO: Declare queryChange = output<string>()
  // TODO: Add focusInput() method — calls .focus() on native element
  // TODO: Add clearAndFocus() method — sets input value to '', emits '', calls focus
  // TODO: Add onInput(event: Event) method — emits input value via queryChange
}
