import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  getLifecycleLessons(): Observable<string[]> {
    return of(['ngOnInit', 'DestroyRef', 'afterNextRender']);
  }
}
