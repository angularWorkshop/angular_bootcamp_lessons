import { WorkspaceBadgeComponent, WorkspaceBadgeVm } from './shared/public-api';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly vm: WorkspaceBadgeVm = { label: 'Core migrations', count: 4 };
}
