import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthState } from '../state/auth.state';
import type { UserRole } from '../models/index';

export function roleGuard(allowedRoles: UserRole[]): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const state  = inject(AuthState);
    const router = inject(Router);
    if (!state.isAuthenticated()) return router.createUrlTree(["/login"]);
    const role = state.currentRole();
    if (role && allowedRoles.includes(role)) return true;
    return router.createUrlTree(["/unauthorized"]);
  };
}