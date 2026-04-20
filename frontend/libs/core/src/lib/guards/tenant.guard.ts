import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../state/auth.state';

export const tenantGuard: CanActivateFn = () => {
  const state  = inject(AuthState);
  const router = inject(Router);
  if (!state.isAuthenticated()) return router.createUrlTree(["/login"]);
  return state.currentTenant() !== null ? true : router.createUrlTree(["/tenant-select"]);
};