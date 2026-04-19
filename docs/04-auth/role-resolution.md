# Role Resolution

## 1. Objective

Define how the user's role is determined after tenant selection, and how this role controls UI visibility and data access.

## 2. Role Types

| Role | App Access | Description |
|------|------------|-------------|
| SINDICO | admin | Building administrator |
| CONSELHO | admin | Council member (limited) |
| MORADOR | morador | Resident |
| PORTEIRO | porteiro | Doorman |
| MASTER_ADMIN | master-admin | Platform admin |

---

## 3. Resolution Process

### 3.1 Flow

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

### 3.2 Implementation

```typescript
// role.service.ts
@Injectable({ providedIn: 'root' })
export class RoleService {
  // Get current role after tenant selection
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

  // Check if user has role
  async hasRole(condominioId: string, requiredRole: string): Promise<boolean> {
    const role = await this.resolveRole(condominioId);
    return role === requiredRole;
  }

  // Check if any of roles
  async hasAnyRole(condominioId: string, roles: string[]): Promise<boolean> {
    const role = await this.resolveRole(condominioId);
    return roles.includes(role);
  }
}
```

---

## 4. Role-Based Access Control

### 4.1 UI Visibility

```typescript
// role.directive.ts
@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string | string[] = [];

  private store = inject(Store);
  private elementRef = inject(ElementRef);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);

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

// Usage in templates
/*
<button appHasRole="sindico" (click)="deleteDeliver()">
  Excluir
</button>

<div *appHasRole="['sindico', 'conselho']">
  Admin panel content
</div>
*/
```

### 4.2 Route Guards

```typescript
// role.guard.ts
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return async () => {
    const store = inject(Store);
    const router = inject(Router);
    
    const currentRole = store.selectSignal(selectCurrentRole);
    const condominioId = store.selectSignal(selectCurrentCondominioId);
    
    if (!condominioId) {
      return router.createUrlTree(['/tenant-select']);
    }
    
    if (!allowedRoles.includes(currentRole())) {
      return router.createUrlTree(['/unauthorized']);
    }
    
    return true;
  };
};

// Usage
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [roleGuard(['sindico', 'conselho'])],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
```

### 4.3 Feature Flags

```typescript
// Feature availability based on role
const FEATURES = {
  // Morador features
  morador: {
    viewDeliveries: true,
    createReservations: true,
    createClassifieds: true,
    contactSindico: true
  },
  // Porteiro features  
  porteiro: {
    registerDeliveries: true,
    searchMoradores: true,
    createOcorrencias: true,
    viewAnnouncements: true
  },
  // Sindico features
  sindico: {
    manageMoradores: true,
    manageDeliveries: true,
    createAnnouncements: true,
    manageReservations: true,
    configureCondominio: true,
    viewReports: true
  }
};

// Check feature access
canAccess(feature: string): boolean {
  const role = this.roleService.getCurrentRole();
  return FEATURES[role]?.[feature] ?? false;
}
```

---

## 5. Role Hierarchy

```typescript
// Hierarchy: higher roles can do lower roles' actions
const ROLE_HIERARCHY = {
  'master_admin': 5,
  'sindico': 4,
  'conselho': 3,
  'porteiro': 2,
  'morador': 1
};

function canPerformAction(
  userRole: string, 
  requiredRole: string
): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

// Usage
if (canPerformAction(currentRole, 'sindico')) {
  // Can access sindico features
}
```

---

## 6. Related Files

- `tenant-selection.md`: Tenant selection flow
- `guards.md`: Route guards
- `roles-and-permissions.md`: Detailed permissions