import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type LessonCard = {
  id: string;
  title: string;
};

@Injectable({ providedIn: 'root' })
export class LessonDataService {
  getLessonById(id: string): Observable<LessonCard> {
    return of({ id, title: `Lesson ${id}` });
  }
}
