import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../state/auth.state';
import { ContextService } from '../services/context.service';
import type { AppKey } from '../interfaces/index.model';

export function contextGuard(appKey: AppKey): CanActivateFn {
  return () => {
    const state = inject(AuthState);
    const ctxSvc = inject(ContextService);
    const router = inject(Router);

    if (!state.isAuthenticated()) return router.createUrlTree(['/login']);

    const ctx = ctxSvc.getContext();
    if (ctx && ctx.platform === appKey) {
      const membershipsLoaded = state.activeMemberships().length > 0 || state.isMasterAdmin();
      if (!membershipsLoaded || ctxSvc.isContextValid(ctx)) {
        ctxSvc.applyContext(ctx);
        return true;
      }
    }

    const autoCtx = ctxSvc.autoSelectContext();
    if (autoCtx && autoCtx.platform === appKey) {
      ctxSvc.setContext(autoCtx);
      ctxSvc.applyContext(autoCtx);
      return true;
    }

    return router.createUrlTree(['/select-context']);
  };
}
