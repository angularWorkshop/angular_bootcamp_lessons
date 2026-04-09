import { WorkspaceBadgeComponent } from './shared/workspace-badge/workspace-badge.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly vm = { label: 'Core migrations', count: 4 };
}
