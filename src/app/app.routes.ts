import { Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page.component';

export const routes: Routes = [
  {
    path: 'details/:id',
    component: DetailsPageComponent,
  },
];
