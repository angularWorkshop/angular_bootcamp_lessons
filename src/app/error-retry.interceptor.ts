import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorRetryInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: add retry for 5xx errors and normalize error payload for UI.
  return next(req).pipe(
    catchError((error) => {
      return throwError(() => error);
    }),
  );
};
