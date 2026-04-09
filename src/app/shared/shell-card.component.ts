import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shell-card',
  template: `
    <article class="table-card" [attr.data-tone]="tone" data-testid="shell-card">
      <p class="hero__eyebrow">Shared shell component</p>
      <h2 data-testid="shell-title">{{ title }}</h2>
      <div data-testid="body-slot"><ng-content select="[shellCardBody]"></ng-content></div>
      <div class="actions">
        <button type="button" data-testid="shell-action" (click)="action.emit()">Run action</button>
        <div data-testid="action-slot"><ng-content select="[shellCardAction]"></ng-content></div>
      </div>
    </article>
  `,
})
export class ShellCardComponent {
  @Input({ required: true }) public title = '';
  @Input() public tone: 'default' | 'warning' = 'default';
  @Output() public readonly action = new EventEmitter<void>();
}
