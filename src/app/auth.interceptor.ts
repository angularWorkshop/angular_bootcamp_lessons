import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: add Authorization header based on AuthTokenService value.
  return next(req);
};
