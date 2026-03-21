import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { WorkspaceSessionService } from './workspace-session.service';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceAccessGuard implements CanActivate {
  constructor(
    private readonly workspaceSessionService: WorkspaceSessionService,
    private readonly router: Router,
  ) {}

  public canActivate(): boolean | UrlTree {
    return this.workspaceSessionService.isUnlocked() ? true : this.router.parseUrl('/access');
  }
}
