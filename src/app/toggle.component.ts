import { Component, model } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  template: `
    <div class="toggle" data-testid="toggle">
      <button
        data-testid="toggle-btn"
        (click)="toggle()"
      >
        Recommend: {{ checked() ? 'Yes' : 'No' }}
      </button>
    </div>
  `,
})
export class ToggleComponent {
  readonly checked = model(false);

  protected toggle(): void {
    this.checked.set(!this.checked());
  }
}
