import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loggedIn = localStorage.getItem('cm_logged') === '1';
  return loggedIn ? true : router.createUrlTree(['/login']);
};
