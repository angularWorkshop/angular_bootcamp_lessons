import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LessonCard, LessonDataService } from './lesson-data.service';

export const lessonRedirectResolver: ResolveFn<LessonCard> = (route) => {
  const service = inject(LessonDataService);
  const id = route.paramMap.get('id') ?? '';

  // TODO: on error navigate to /error and return EMPTY.
  return service.getLessonById(id);
};
