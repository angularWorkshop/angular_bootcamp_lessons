import { Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page.component';
import { lessonDetailsResolver } from './lesson-details.resolver';

export const routes: Routes = [
  {
    path: 'details/:id',
    component: DetailsPageComponent,
    resolve: {
      lesson: lessonDetailsResolver,
    },
  },
];
