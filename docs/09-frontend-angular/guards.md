# Route Guards

```typescript
// auth.guard.ts
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();
  if (!isAuthenticated) {
    return router.createUrlTree(['/auth/login']);
  }
  return true;
};

// role.guard.ts
export const roleGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const requiredRoles = route.data['roles'] as string[];
  const user = await authService.getCurrentUser();

  if (!requiredRoles?.includes(user?.role)) {
    return router.createUrlTree(['/unauthorized']);
  }
  return true;
};
```