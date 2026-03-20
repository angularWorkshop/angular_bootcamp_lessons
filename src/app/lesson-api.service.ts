import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LessonApiResponse, LessonDto } from './lesson-api.models';

@Injectable({
  providedIn: 'root',
})
export class LessonApiService {
  private readonly lessonsUrl = '/api/lessons';

  public constructor(private readonly http: HttpClient) {}

  public getLessons(): Observable<LessonDto[]> {
    return this.http.get<LessonApiResponse>(this.lessonsUrl).pipe(map((response) => response.items));
  }
}
