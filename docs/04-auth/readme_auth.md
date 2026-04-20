# Authentication & Authorization

## Overview

This document describes the complete authentication and authorization system for CondoMais, covering login flows, session management, role-based access control, and multi-tenant handling.

---

## 1. Authentication Methods

### 1.1 Google OAuth 2.0 (Primary)

```typescript
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

async signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  
  if (this.platform.isMobile) {
    return signInWithRedirect(this.auth, provider);
  }
  
  return signInWithPopup(this.auth, provider);
}

async handleOAuthCallback(): Promise<boolean> {
  const { user } = await getRedirectResult(this.auth);
  if (user) {
    await this.linkUsuarioRecord(user);
    return true;
  }
  return false;
}
```

### 1.2 Email/Password

```typescript
async registerWithEmail(email: string, password: string): Promise<UserCredential> {
  const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
  await sendEmailVerification(this.auth.currentUser);
  return { user };
}

async signInWithEmail(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(this.auth, email, password);
}
```

### 1.3 Magic Link

```typescript
async sendMagicLink(email: string): Promise<void> {
  const actionCodeSettings = {
    url: `${window.location.origin}/auth/verify?email=${email}`,
    handleCodeInApp: true
  };
  await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
  sessionStorage.setItem('emailForSignIn', email);
}

async verifyMagicLink(): Promise<boolean> {
  const email = sessionStorage.getItem('emailForSignIn');
  if (isSignInWithEmailLink(this.auth, window.location.href)) {
    const result = await signInWithEmailLink(this.auth, email);
    return !!result.user;
  }
  return false;
}
```

### 1.4 Error Handling

```typescript
const AUTH_ERRORS: Record<string, string> = {
  'auth/invalid-email': 'Email inválido',
  'auth/user-disabled': 'Usuário desativado',
  'auth/user-not-found': 'Usuário não encontrado',
  'auth/wrong-password': 'Senha incorreta',
  'auth/email-already-in-use': 'Email já cadastrado',
  'auth/weak-password': 'Senha muito fraca',
  'auth/popup-closed-by-user': 'Login cancelado'
};
```

---

## 2. Session Management

### 2.1 Session Types

| Device Type | Duration | Auto-Logout |
|------------|----------|-------------|
| Remember Me | 30 days | No inactivity timeout |
| Public Device | 30 minutes | 30 min inactive |
| Mobile App | Session + refresh token | 30 min inactive |

### 2.2 Implementation

```typescript
@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly SESSION_KEY = 'condomais_session';
  private readonly REMEMBER_ME_KEY = 'condomais_remember';
  
  async setSession(session: Session, rememberMe: boolean): Promise<void> {
    if (rememberMe) {
      localStorage.setItem(this.REMEMBER_ME_KEY, 'true');
    }
    await this.supabase.auth.setSession(session);
  }
  
  async clearSession(): Promise<void> {
    await this.supabase.auth.signOut();
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.REMEMBER_ME_KEY);
  }
  
  isRememberMe(): boolean {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
  }
}
```

### 2.3 Token Refresh

```typescript
private setupAutoRefresh(): void {
  interval(60000).pipe(
    filter(() => !!this.authService.getToken()),
    switchMap(() => this.checkTokenExpiry())
  ).subscribe(async (expiring) => {
    if (expiring) {
      await this.supabase.auth.refreshSession();
    }
  });
}
```

### 2.4 Security

```typescript
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    this.router.navigate(['/auth/login']);
    this.toast.show('Sessão encerrada');
  }
});
```

---

## 3. User Roles

| Role | App Access | Description |
|------|------------|-------------|
| SINDICO | admin | Building administrator (1-3 per building) |
| CONSELHO | admin | Council member (0-10 per building) |
| MORADOR | morador | Resident (N units, required) |
| PORTEIRO | porteiro | Doorman/concierge (1-5 per building) |
| MASTER_ADMIN | master-admin | Platform admin |

### 3.1 Role Hierarchy

```typescript
const ROLE_HIERARCHY = {
  'master_admin': 5,
  'sindico': 4,
  'conselho': 3,
  'porteiro': 2,
  'morador': 1
};
```

---

## 4. Permissions

### 4.1 Permission Matrix

| Feature | Morador | Porteiro | Síndico | Conselho |
|---------|--------|----------|---------|----------|
| View own deliveries | ✓ | ✓ | ✓ | ✓ |
| Register deliveries | ✗ | ✓ | ✓ | ✗ |
| View all deliveries | ✗ | ✓ | ✓ | ✓ |
| Create announcements | ✗ | ✗ | ✓ | ✓ |
| Delete announcements | ✗ | ✗ | ✓ | ✗ |
| Create reservations | ✓ | ✓ | ✓ | ✓ |
| Cancel reservations | ✓* | ✓ | ✓ | ✓ |
| View all reservations | ✗ | ✓ | ✓ | ✓ |
| Create classifieds | ✓ | ✗ | ✓ | ✓ |
| Delete classifieds | ✗ | ✗ | ✓ | ✗ |
| Manage residents | ✗ | ✗ | ✓ | ✗ |
| View reports | ✗ | ✓ | ✓ | ✓ |

*Own reservations only

### 4.2 Permission Service

```typescript
@Injectable({ providedIn: 'root' })
export class PermissionService {
  hasPermission(action: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;
    
    if (user.role === 'sindico') return true;
    
    return this.rolePermissions[user.role]?.includes(action);
  }

  requirePermission(action: string): void {
    if (!this.hasPermission(action)) {
      throw new ForbiddenException('Permissão negada');
    }
  }
}
```

---

## 5. Role Resolution

### 5.1 Resolution Flow

```
User Logs In
    │
    ▼
Fetch Memberships
    │
    ├── 0 memberships ──► No Access
    │
    ├── 1 membership ──► Set Current Condominio
    │
    └── 2+ memberships ──► Tenant Selector
                              │
                              ▼
                        Set Current Condominio
                              │
                              ▼
                        Get Role from Membership
                              │
                              ▼
                        Redirect to App Route
```

### 5.2 Implementation

```typescript
@Injectable({ providedIn: 'root' })
export class RoleService {
  async resolveRole(condominioId: string): Promise<string | null> {
    const user = this.authService.getCurrentUser();
    
    const { data: membership } = await supabase
      .from('user_condominios')
      .select('role')
      .eq('user_id', user.id)
      .eq('condominio_id', condominioId)
      .eq('status', 'active')
      .single();
    
    return membership?.role;
  }
}
```

---

## 6. Tenant Selection

### 6.1 Behavior

| User's Memberships | Behavior |
|-------------------|---------|
| 0 memberships | Show "no access" screen |
| 1 membership | Auto-select and continue |
| 2+ memberships | Show tenant selector |

### 6.2 Implementation

```typescript
async handlePostLogin() {
  const { data: memberships } = await supabase
    .from('user_condominios')
    .select(`*, condominio:condominios(id, nome, subdomain, logo_url)`)
    .eq('user_id', this.currentUser.id)
    .eq('status', 'active');

  this.store.dispatch(setMembershipsAction(memberships));

  if (memberships.length === 0) {
    return '/no-access';
  } else if (memberships.length === 1) {
    return this.selectCondominio(memberships[0].condominio_id);
  } else {
    return '/tenant-select';
  }
}

async selectCondominio(condominioId: string) {
  const { data: membership } = await supabase
    .from('user_condominios')
    .select('role')
    .eq('user_id', this.authService.currentUser.id)
    .eq('condominio_id', condominioId)
    .single();

  this.currentCondominioId.set(condominioId);
  this.currentRole.set(membership.role);
  localStorage.setItem('current_condominio_id', condominioId);

  this.redirectToApp(membership.role);
}
```

### 6.3 Switching Condominios

```typescript
@Component({
  selector: 'app-tenant-switcher',
  template: `
    <button mat-button [matMenuTriggerFor]="tenantMenu">
      <img [src]="currentCondominio?.logo_url" class="logo">
      {{ currentCondominio?.nome }}
      <mat-icon>arrow_drop_down</mat-icon>
    </button>

    <mat-menu #tenantMenu="matMenu">
      <button mat-menu-item *ngFor="let m of memberships" (click)="switchTo(m)">
        <mat-icon>apartment</mat-icon>
        {{ m.condominio.nome }}
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="openTenantSelector()">
        <mat-icon>add</mat-icon> Trocar condomínio
      </button>
    </mat-menu>
  `
})
export class TenantSwitcherComponent {
  memberships = this.store.select(selectMemberships);
  switchTo(membership: Membership) {
    this.tenantService.selectCondominio(membership.condominio_id);
  }
}
```

---

## 7. Route Guards

### 7.1 Auth Guard

```typescript
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/auth/login']);
  }
  return true;
};
```

### 7.2 Condominio Guard

```typescript
export const requireCondominioGuard: CanActivateFn = () => {
  const tenantService = inject(TenantService);
  if (!tenantService.getCurrentCondominioId()) {
    return router.createUrlTree(['/tenant-select']);
  }
  return true;
};
```

### 7.3 Role Guard

```typescript
export const requireRoleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const tenantService = inject(TenantService);
    const role = tenantService.getCurrentRole();

    if (!allowedRoles.includes(role)) {
      return router.createUrlTree(['/unauthorized']);
    }
    return true;
  };
};
```

### 7.4 Route Configuration

```typescript
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, requireCondominioGuard, requireRoleGuard(['sindico', 'conselho'])],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'morador',
    canActivate: [authGuard, requireCondominioGuard, requireRoleGuard(['morador'])],
    loadChildren: () => import('./morador/morador.module').then(m => m.MoradorModule)
  },
  {
    path: 'porteiro',
    canActivate: [authGuard, requireCondominioGuard, requireRoleGuard(['porteiro'])],
    loadChildren: () => import('./porteiro/porteiro.module').then(m => m.PorteiroModule)
  }
];
```

---

## 8. UI Visibility

### 8.1 Has Role Directive

```typescript
@Directive({ selector: '[appHasRole]' })
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string | string[] = [];

  ngOnInit() {
    const currentRole = this.store.select(selectCurrentRole);
    const roles = Array.isArray(this.appHasRole) 
      ? this.appHasRole 
      : [this.appHasRole];

    if (roles.includes(currentRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
```

```html
<button appHasRole="sindico" (click)="deleteDeliver()">Excluir</button>

<div *appHasRole="['sindico', 'conselho']">Admin panel content</div>
```

---

## 9. State Management

### 9.1 Auth State

```typescript
interface AuthState {
  user: User | null;
  memberships: Membership[];
  selectedCondominioId: string | null;
  currentRole: string | null;
  isAuthenticated: boolean;
}

interface Membership {
  condominio_id: string;
  role: string;
  status: string;
  condominio: {
    nome: string;
    subdomain: string;
    logo_url: string;
  };
}
```

### 9.2 Persist Selection

```typescript
async function initAuth() {
  const storedId = localStorage.getItem('current_condominio_id');
  
  if (storedId && getIsAuthenticated()) {
    const { data: membership } = await supabase
      .from('user_condominios')
      .select('role')
      .eq('user_id', getCurrentUser.id)
      .eq('condominio_id', storedId)
      .eq('status', 'active')
      .single();

    if (membership) {
      tenantService.currentCondominioId.set(storedId);
      tenantService.currentRole.set(membership.role);
    } else {
      localStorage.removeItem('current_condominio_id');
    }
  }
}
```

---

## 10. Login Flow Diagram

```
┌─────────────┐
│  App Open   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Check     │── Has valid session? ──▶ [Dashboard]
│  Session   │
└──────┬─────┘
       │ No
       ▼
┌─────────────┐
│  Login     │
│  Screen    │
└──────┬─────┘
       │
   ┌───┼───────────┐
   ▼   ▼           ▼
Google  Email    Magic Link
   │   │           │
   ▼   ▼           ▼
 OAuth  Register  Send Link
   │   │           │
   │   ▼           ▼
   │ Email      Email
   │ Verify    with Link
   │           │
   ▼           ▼
[Verify + Create User]
         │
         ▼
   [Dashboard]
```

---

## 11. Security Requirements

- Password minimum 8 characters, 1 uppercase, 1 number
- Account lockout after 5 failed attempts (15 min)
- Session expires after 30 days (remember me)
- Session expires after 30 minutes (public device)
- 2FA recommended for Síndico role