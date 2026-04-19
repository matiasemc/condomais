# Roles and Permissions

## 1. Objective

Define the complete role-based access control (RBAC) system for CondoMais.

## 2. Scope

- User roles definition
- Permission matrices
- Feature access controls
- API-level restrictions

---

## 3. User Roles

### 3.1 Role Definitions

| Role | Description | Count per Building |
|------|-------------|-------------------|
| MORADOR | Resident living in unit | N units (required) |
| PORTEIRO | Building doorman/concierge | 1-5 (typical) |
| SINDICO | Building administrator | 1-3 (typical) |
| CONSELHO | Building council member | 0-10 (optional) |

### 3.2 Permission Matrix

| Feature | Morador | Porteiro | Síndico | Conselho |
|---------|--------|----------|---------|---------|
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
| Manage settings | ✗ | ✗ | ✓ | ✗ |
| View reports | ✗ | ✓ | ✓ | ✓ |

*Own reservations only

---

## 4. Permission Definitions

### 4.1 Resource-Action Pairs

```typescript
// All permissions
const PERMISSIONS = {
  // Entregas
  'entregas:read': 'View deliveries',
  'entregas:read:own': 'View own deliveries',
  'entregas:read:all': 'View all deliveries',
  'entregas:create': 'Register deliveries',
  'entregas:update': 'Update delivery',
  'entregas:delete': 'Delete delivery',
  
  // Avisos
  'avisos:read': 'View announcements',
  'avisos:create': 'Create announcements',
  'avisos:update': 'Update announcements',
  'avisos:delete': 'Delete announcements',
  
  // Reservas
  'reservas:read': 'View reservations',
  'reservas:read:all': 'View all reservations',
  'reservas:create': 'Create reservation',
  'reservas:update': 'Update reservation',
  'reservas:cancel': 'Cancel reservation',
  'reservas:delete': 'Delete reservation',
  
  // Classificados
  'classificados:read': 'View classifieds',
  'classificados:create': 'Create classified',
  'classificados:update': 'Update classified',
  'classificados:delete': 'Delete classified',
  
  // Moradores
  'moradores:read': 'View residents',
  'moradores:create': 'Create resident',
  'moradores:update': 'Update resident',
  'moradores:delete': 'Delete resident',
  
  // Config
  'configuracoes:read': 'View settings',
  'configuracoes:update': 'Update settings',
  
  // Admin
  'admin:relatorios': 'View reports',
  'admin:usuarios': 'Manage users',
  'admin:integracoes': 'Manage integrations'
};
```

### 4.2 Role-Based Permissions

```sql
-- Table: role_permissions
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role VARCHAR(20) NOT NULL,
  resource VARCHAR(50) NOT NULL,
  action VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(role, resource, action)
);

-- Seed data
INSERT INTO role_permissions (role, resource, action) VALUES
-- Morador
('morador', 'entregas', 'read'),
('morador', 'avisos', 'read'),
('morador', 'reservas', 'read'),
('morador', 'reservas', 'create'),
('morador', 'reservas', 'update:own'),
('morador', 'reservas', 'delete:own'),
('morador', 'classificados', 'read'),
('morador', 'classificados', 'create'),
('morador', 'classificados', 'update:own'),
('morador', 'moradores', 'read:own'),

-- Porteiro
('porteiro', 'entregas', 'read'),
('porteiro', 'entregas', 'create'),
('porteiro', 'entregas', 'update'),
('porteiro', 'avisos', 'read'),
('porteiro', 'reservas', 'read'),
('porteiro', 'moradores', 'read'),
('porteiro', 'ocorrencias', 'read'),
('porteiro', 'ocorrencias', 'create'),

-- Síndico
('sindico', 'moradores', 'read'),
('sindico', 'moradores', 'create'),
('sindico', 'moradores', 'update'),
('sindico', 'moradores', 'delete'),
('sindico', 'entregas', 'read:all'),
('sindico', 'entregas', 'update'),
('sindico', 'avisos', 'create'),
('sindico', 'avisos', 'update'),
('sindico', 'avisos', 'delete'),
('sindico', 'reservas', 'read:all'),
('sindico', 'reservas', 'update'),
('sindico', 'reservas', 'delete'),
('sindico', 'classificados', 'delete'),
('sindico', 'configuracoes', 'read'),
('sindico', 'configuracoes', 'update'),
('sindico', 'admin', 'relatorios');
```

---

## 5. Permission Service

```typescript
// permission.service.ts
@Injectable({ providedIn: 'root' })
export class PermissionService {
  private rolePermissions = ROLE_PERMISSIONS;

  hasPermission(action: string): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;
    
    // Síndico has all permissions in their building
    if (user.role === 'sindico') return true;
    
    return this.rolePermissions[user.role]?.includes(action);
  }

  requirePermission(action: string): void {
    if (!this.hasPermission(action)) {
      throw new ForbiddenException('Permissão negada');
    }
  }
}

// Usage in components
@Injectable({ providedIn: 'root' })
export class EntregaService {
  @RequirePermission('entregas:create')
  async registerEntrega(data: EntregaInput): Promise<Entrega> {
    // ...
  }
}
```

---

## 6. Route Guards

```typescript
// role.guard.ts
export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const requiredRoles = route.data['roles'] as string[];
  const user = authService.getCurrentUser();
  
  if (!requiredRoles?.includes(user?.role)) {
    return router.createUrlTree(['/unauthorized']);
  }
  
  return true;
};

// Usage
const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['sindico'] },
    loadChildren: () => import('./admin/admin.module')
  }
];
```