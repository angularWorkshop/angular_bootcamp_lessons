import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shell-card',
  template: `
    <article class="table-card">
      <p class="hero__eyebrow">Shared shell component</p>
      <h2 data-testid="shell-title">{{ title }}</h2>
      <div data-testid="body-slot">Body placeholder</div>
      <button type="button" data-testid="shell-action">Run action</button>
    </article>
  `,
})
export class ShellCardComponent {
  @Input({ required: true }) public title = '';
  @Input() public tone: 'default' | 'warning' = 'default';
  @Output() public readonly action = new EventEmitter<void>();
}
