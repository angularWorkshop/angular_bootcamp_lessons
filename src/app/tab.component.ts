import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngIf="active" data-testid="tab-panel">
      <ng-content></ng-content>
    </section>
  `,
})
export class TabComponent {
  @Input() title = '';
  active = false;
}
