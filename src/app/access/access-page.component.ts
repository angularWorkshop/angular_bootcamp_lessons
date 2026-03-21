import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceSessionService } from '../core/workspace-session.service';

@Component({
  selector: 'app-access-page',
  templateUrl: './access-page.component.html',
  styleUrl: './access-page.component.scss',
})
export class AccessPageComponent {
  constructor(
    private readonly workspaceSessionService: WorkspaceSessionService,
    private readonly router: Router,
  ) {}

  protected unlockWorkspace(): void {
    this.workspaceSessionService.unlock();
    void this.router.navigateByUrl('/tasks');
  }
}
