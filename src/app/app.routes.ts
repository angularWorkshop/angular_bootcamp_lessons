import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users.component';
import { HomePageComponent } from './home-page.component';
import { ReportsPageComponent } from './reports-page.component';

// TODO: Convert reports route to lazy loading via loadComponent.
// TODO: Convert admin route to lazy loading via loadChildren.
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'users',
        component: AdminUsersComponent,
      },
    ],
  },
];
