import { Component } from '@angular/core';
import { ProjectStatusVm } from './shared/contracts/project-status.vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly vm: ProjectStatusVm = { name: 'Operations dashboard', status: 'healthy' };
}
