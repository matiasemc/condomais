import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../state/auth.state';

export const masterAdminGuard: CanActivateFn = () => {
  const state  = inject(AuthState);
  const router = inject(Router);
  if (!state.isAuthenticated()) return router.createUrlTree(['/login']);
  if (state.isMasterAdmin())    return true;
  return router.createUrlTree(['/unauthorized']);
};
