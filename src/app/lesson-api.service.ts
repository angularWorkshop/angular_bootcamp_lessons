import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LessonDto } from './lesson-api.models';

@Injectable({
  providedIn: 'root',
})
export class LessonApiService {
  private readonly lessonsUrl = '/api/lessons';

  public constructor(private readonly http: HttpClient) {}

  public getLessons(): Observable<LessonDto[]> {
    // TODO: request the typed API response through HttpClient and return only the items array
    return of([]);
  }
}
