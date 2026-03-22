import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LessonFeedItem {
  id: number;
  title: string;
  level: 'core' | 'advanced' | 'legacy';
}

@Injectable({ providedIn: 'root' })
export class LessonFeedService {
  constructor(private readonly http: HttpClient) {}

  loadLessons(): Observable<LessonFeedItem[]> {
    return this.http.get<LessonFeedItem[]>('/api/lesson-feed');
  }
}
