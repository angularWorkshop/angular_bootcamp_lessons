import { Routes } from '@angular/router';
import { AccessPageComponent } from './access/access-page.component';
import { WorkspaceAccessGuard } from './core/workspace-access.guard';
import { TaskFormPageComponent } from './tasks/task-form-page.component';
import { TaskListPageComponent } from './tasks/task-list-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks',
  },
  {
    path: 'access',
    component: AccessPageComponent,
  },
  {
    path: 'tasks',
    canActivate: [WorkspaceAccessGuard],
    component: TaskListPageComponent,
  },
  {
    path: 'tasks/new',
    canActivate: [WorkspaceAccessGuard],
    component: TaskFormPageComponent,
  },
  {
    path: 'tasks/:id/edit',
    canActivate: [WorkspaceAccessGuard],
    component: TaskFormPageComponent,
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
