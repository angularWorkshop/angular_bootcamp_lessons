import { Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page.component';
import { ErrorPageComponent } from './error-page.component';
import { lessonRedirectResolver } from './lesson-redirect.resolver';

export const routes: Routes = [
  {
    path: 'details/:id',
    component: DetailsPageComponent,
    resolve: {
      lesson: lessonRedirectResolver,
    },
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
];
