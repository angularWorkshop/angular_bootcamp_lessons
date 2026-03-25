import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  // TODO: preload only routes with data.preload === true
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    return of(null);
  }
}
