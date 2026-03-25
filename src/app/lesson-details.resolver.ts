import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { LessonDetails } from './lesson-data.service';

export const lessonDetailsResolver: ResolveFn<LessonDetails> = (route) => {
  const id = route.paramMap.get('id') ?? '';

  // TODO: load details through LessonDataService by route id.
  return of({
    id,
    title: 'TODO: resolver data',
  });
};
