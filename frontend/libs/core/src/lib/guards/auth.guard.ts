import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../state/auth.state';

export const authGuard: CanActivateFn = () => {
  const state  = inject(AuthState);
  const router = inject(Router);
  return state.isAuthenticated() ? true : router.createUrlTree(["/login"]);
};