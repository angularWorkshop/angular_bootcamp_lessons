import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type LessonDetails = {
  id: string;
  title: string;
};

@Injectable({ providedIn: 'root' })
export class LessonDataService {
  getLessonById(id: string): Observable<LessonDetails> {
    return of({
      id,
      title: `Lesson #${id}`,
    });
  }
}
