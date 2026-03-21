import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceAccessGuard } from './workspace-access.guard';
import { WorkspaceSessionService } from './workspace-session.service';

@Component({
  template: '',
})
class DummyComponent {}

describe('WorkspaceAccessGuard', () => {
  let guard: WorkspaceAccessGuard;
  let router: Router;
  let workspaceSessionService: WorkspaceSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'access', component: DummyComponent },
          { path: 'tasks', component: DummyComponent },
        ]),
      ],
    });

    guard = TestBed.inject(WorkspaceAccessGuard);
    router = TestBed.inject(Router);
    workspaceSessionService = TestBed.inject(WorkspaceSessionService);
  });

  it('should redirect a locked workspace to /access', () => {
    const result = guard.canActivate();

    expect(result instanceof UrlTree).toBe(true);
    expect(router.serializeUrl(result as UrlTree)).toBe('/access');
  });

  it('should allow navigation when the workspace is unlocked', () => {
    workspaceSessionService.unlock();

    expect(guard.canActivate()).toBe(true);
  });
});
