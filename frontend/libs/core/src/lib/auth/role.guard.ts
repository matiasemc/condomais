import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../state/auth.state';
import type { UserRole } from '../interfaces/index.model';

export function roleGuard(allowedRoles: UserRole[]): CanActivateFn {
  return () => {
    const state = inject(AuthState);
    const router = inject(Router);

    if (!state.isAuthenticated()) {
      return router.createUrlTree(['/login']);
    }

    if (allowedRoles.includes('MASTER_ADMIN') && state.isMasterAdmin()) {
      return true;
    }

    const role = state.currentRole();
    if (role && allowedRoles.includes(role)) {
      return true;
    }

    return router.createUrlTree(['/unauthorized']);
  };
}
