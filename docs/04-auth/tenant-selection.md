# Tenant Selection Flow

## 1. Objective

Define the tenant selection implementation that handles users with multiple condominium memberships, enabling them to switch between condominios they belong to.

## 2. When Tenant Selection is Needed

| User's Memberships | Behavior |
|-------------------|---------|
| 0 memberships | Show "no access" screen |
| 1 membership | Auto-select and continue |
| 2+ memberships | Show tenant selector |

---

## 3. Step-by-Step Implementation

### Step 1: Store Memberships at Login

```typescript
// auth.service.ts - After successful login
async handlePostLogin() {
  // Fetch all memberships
  const { data: memberships } = await supabase
    .from('user_condominios')
    .select(`
      *,
      condominio:condominios(id, nome, subdomain, logo_url)
    `)
    .eq('user_id', this.currentUser.id)
    .eq('status', 'active');

  // Store in state
  this.store.dispatch(setMembershipsAction(memberships));

  // Based on count, decide next step
  if (memberships.length === 0) {
    return '/no-access';
  } else if (memberships.length === 1) {
    // Auto-select the single membership
    return this.selectCondominio(memberships[0].condominio_id);
  } else {
    // Show selector
    return '/tenant-select';
  }
}
```

### Step 2: Tenant Selector UI Component

```typescript
// tenant-select.component.ts
@Component({
  selector: 'app-tenant-select',
  template: `
    <div class="tenant-select">
      <h1>Selecione o Condomínio</h1>
      <p class="subtitle">Você pertence a mais de um condomínio</p>

      <div class="condominio-list">
        <mat-card 
          *ngFor="let m of memberships" 
          class="condominio-card"
          (click)="select(m)"
        >
          <mat-card-content>
            <div class="condominio-icon">
              <img *ngIf="m.condominio.logo_url" [src]="m.condominio.logo_url">
              <mat-icon *ngIf="!m.condominio.logo_url">apartment</mat-icon>
            </div>
            <div class="condominio-info">
              <h2>{{ m.condominio.nome }}</h2>
              <span class="role-badge">{{ getRoleLabel(m.role) }}</span>
            </div>
            <mat-icon class="arrow">chevron_right</mat-icon>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class TenantSelectComponent {
  memberships = this.store.select(selectMemberships);

  select(membership: Membership) {
    this.tenantService.selectCondominio(membership.condominio_id);
  }
}
```

### Step 3: Tenant Service/Select

```typescript
// tenant.service.ts
@Injectable({ providedIn: 'root' })
export class TenantService {
  private currentCondominioId = signal<string | null>(null);
  private currentRole = signal<string | null>(null);

  async selectCondominio(condominioId: string) {
    // Get membership details
    const { data: membership } = await supabase
      .from('user_condominios')
      .select('role')
      .eq('user_id', this.authService.currentUser.id)
      .eq('condominio_id', condominioId)
      .single();

    // Store current
    this.currentCondominioId.set(condominioId);
    this.currentRole.set(membership.role);

    // Store in localStorage for persistence
    localStorage.setItem('current_condominio_id', condominioId);

    // Redirect based on role
    this.redirectToApp(membership.role);
  }

  private redirectToApp(role: string) {
    const router = inject(Router);

    switch (role) {
      case 'sindico':
      case 'conselho':
        router.navigate(['/admin/dashboard']);
        break;
      case 'morador':
        router.navigate(['/morador/home']);
        break;
      case 'porteiro':
        router.navigate(['/porteiro/dashboard']);
        break;
      default:
        router.navigate(['/no-access']);
    }
  }

  // Getters
  getCurrentCondominioId() {
    return this.currentCondominioId();
  }

  getCurrentRole() {
    return this.currentRole();
  }
}
```

---

## 4. State Management

### 4.1 Auth State

```typescript
// auth.state.ts
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

### 4.2 Persist Selection

```typescript
// Rehydrate on app init
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
      // Restore session
      tenantService.currentCondominioId.set(storedId);
      tenantService.currentRole.set(membership.role);
    } else {
      // Clear invalid selection
      localStorage.removeItem('current_condominio_id');
    }
  }
}
```

---

## 5. Guards Using Selection

### 5.1 Condominio Guard

```typescript
// require-condominio.guard.ts
export const requireCondominioGuard: CanActivateFn = () => {
  const tenantService = inject(TenantService);

  // Must have selected a condominio
  if (!tenantService.getCurrentCondominioId()) {
    return router.createUrlTree(['/tenant-select']);
  }

  return true;
};
```

### 5.2 Role Guard

```typescript
// require-role.guard.ts
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

### 5.3 App Routes

```typescript
// app.routes.ts
const routes: Routes = [
  // ADMIN routes (sindico/conselho)
  {
    path: 'admin',
    canActivate: [authGuard, requireCondominioGuard, requireRoleGuard(['sindico', 'conselho'])],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  // MORADOR routes
  {
    path: 'morador',
    canActivate: [authGuard, requireCondominioGuard, requireRoleGuard(['morador'])],
    loadChildren: () => import('./morador/morador.module').then(m => m.MoradorModule)
  },

  // PORTEIRO routes
  {
    path: 'porteiro',
    canActivate: [authGuard, requireCondominioGuard, requireRoleGuard(['porteiro'])],
    loadChildren: () => import('./porteiro/porteiro.module').then(m => m.PorteiroModule)
  },

  // Tenant select
  {
    path: 'tenant-select',
    component: TenantSelectComponent
  }
];
```

---

## 6. Switching Condominios

### 6.1 Switcher Component

```typescript
// header-tenant-switcher.component.ts
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
        <span class="role-label">({{ m.role }})</span>
      </button>
      <mat-divider></mat-divider>
      <button mat-menu-item (click)="openTenantSelector()">
        <mat-icon>add</mat-icon>
        Trocar condomínio
      </button>
    </mat-menu>
  `,
  styles: [`
    .role-label {
      font-size: 12px;
      color: #666;
      margin-left: 8px;
    }
  `]
})
export class TenantSwitcherComponent {
  memberships = this.store.select(selectMemberships);
  currentCondominio = this.store.select(selectCurrentCondominio);

  switchTo(membership: Membership) {
    this.tenantService.selectCondominio(membership.condominio_id);
  }
}
```

---

## 7. Related Files

- `tables-membership.md`: Membership table
- `multi-tenant-membership.md`: Architecture overview
- `routing.md`: Angular routing
- `guards.md`: Route guards