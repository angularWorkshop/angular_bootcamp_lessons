import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceSessionService } from './core/workspace-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    protected readonly workspaceSessionService: WorkspaceSessionService,
    private readonly router: Router,
  ) {}

  protected goToAccess(): void {
    void this.router.navigateByUrl('/access');
  }

  protected goToTasks(): void {
    void this.router.navigateByUrl('/tasks');
  }

  protected goToCreateTask(): void {
    void this.router.navigateByUrl('/tasks/new');
  }
}
