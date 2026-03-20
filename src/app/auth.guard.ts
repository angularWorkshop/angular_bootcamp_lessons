import { CanActivateFn } from '@angular/router';

// TODO: Implement a functional canActivate guard.
// If the user is NOT logged in (use AuthService.isLoggedIn),
// redirect to '/login' and return false.
// If the user IS logged in, return true.
//
// Hint: use inject(AuthService) and inject(Router) inside the function.

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
