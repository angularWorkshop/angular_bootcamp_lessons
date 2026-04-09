import { Component, Input } from '@angular/core';
import { WorkspaceBadgeVm } from './workspace-badge.models';

@Component({
  selector: 'app-workspace-badge',
  template: `
    <article class="card" data-testid="workspace-badge">
      <p class="hero__eyebrow">{{ vm.label }}</p>
      <strong data-testid="workspace-badge-count">{{ vm.count }}</strong>
    </article>
  `,
})
export class WorkspaceBadgeComponent {
  @Input({ required: true }) public vm!: WorkspaceBadgeVm;
}
