import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { LessonCard, LessonDataService } from './lesson-data.service';

export const lessonRedirectResolver: ResolveFn<LessonCard> = (route) => {
  const service = inject(LessonDataService);
  const router = inject(Router);
  const id = route.paramMap.get('id') ?? '';

  return service.getLessonById(id).pipe(
    catchError(() => {
      void router.navigate(['/error']);
      return EMPTY;
    }),
  );
};
