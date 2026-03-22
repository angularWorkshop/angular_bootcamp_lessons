import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-name-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // TODO: compose FocusHighlightDirective + AutoTrimDirective with hostDirectives.
  template: `
    <label class="field">
      Profile name
      <input
        data-testid="profile-input"
        [ngModel]="value"
        (ngModelChange)="valueChange.emit($event)"
        placeholder="Type display name" />
    </label>
  `,
  styles: [
    `
      :host {
        display: block;
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        padding: 0.75rem;
      }
      :host.focus-highlight {
        border-color: #2563eb;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
      }
      .field {
        display: grid;
        gap: 0.35rem;
        font-weight: 600;
      }
      input {
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        padding: 0.5rem 0.65rem;
      }
    `,
  ],
})
export class ProfileNameFieldComponent {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
}
