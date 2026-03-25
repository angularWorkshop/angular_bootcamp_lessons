import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { LessonDataService, LessonDetails } from './lesson-data.service';

export const lessonDetailsResolver: ResolveFn<LessonDetails> = (route) => {
  const id = route.paramMap.get('id') ?? '';
  const lessonDataService = inject(LessonDataService);

  return lessonDataService.getLessonById(id);
};
