import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'analytics',
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.routes').then(m => m.ANALYTICS_ROUTES),
    data: {
      preload: true,
    },
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes').then(m => m.SETTINGS_ROUTES),
    data: {
      preload: false,
    },
  },
];
