import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, of, retry, throwError } from 'rxjs';

type UiHttpError = {
  status: number;
  message: string;
};

export const errorRetryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 2,
      delay: (error) => {
        if (error?.status >= 500) {
          return of(0);
        }

        return throwError(() => error);
      },
    }),
    catchError((error) => {
      const normalizedError: UiHttpError = {
        status: error?.status ?? 0,
        message: error?.error?.message || error?.message || 'Unexpected HTTP error',
      };

      return throwError(() => normalizedError);
    }),
  );
};
