import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'reports',
    loadComponent: () => import('./reports-page.component').then(m => m.ReportsPageComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
];
