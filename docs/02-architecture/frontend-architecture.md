# Frontend Architecture

## 1. Objective

Define the Angular frontend architecture for CondoMais, establishing project structure, modular design, and component patterns used across all applications (Resident App, Doorman App, Admin Panel).

## 2. Scope

This document covers:
- Monorepo structure
- Feature modules and lazy loading
- Shared components and utilities
- State management patterns
- Routing configuration

---

## 3. Monorepo Structure

### 3.1 Root Project Structure

```
condomais/
├── projects/
│   ├── morador-app/          # Resident mobile app (iOS/Android)
│   ├── porteiro-app/        # Doorman web app
│   ├── admin-panel/         # Administrator web panel
│   └── shared-library/      # Shared components, services, utilities
├── angular.json
├── package.json
├── tsconfig.json
├── nx.json                   # Nx workspace config
└── apps/
```

### 3.2 Shared Library Structure

```
projects/shared-library/
├── src/
│   ├── lib/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── input/
│   │   │   ├── loading-spinner/
│   │   │   └── header/
│   │   ├── services/        # Core services
│   │   │   ├── api.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── storage.service.ts
│   │   ├── guards/          # Route guards
│   │   │   ├── auth.guard.ts
│   │   │   ├── role.guard.ts
│   │   │   └── tenant.guard.ts
│   │   ├── interceptors/     # HTTP interceptors
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── error.interceptor.ts
│   │   │   └── tenant.interceptor.ts
│   │   ├── models/          # TypeScript interfaces
│   │   │   ├──morador.model.ts
│   │   │   ├──entrega.model.ts
│   │   │   ├──aviso.model.ts
│   │   │   ├──reserva.model.ts
│   │   │   └──classificado.model.ts
│   │   ├── pipes/           # Custom pipes
│   │   │   └── phone.pipe.ts
│   │   └── utils/           # Utility functions
│   │       ├── date.utils.ts
│   │       └── validation.utils.ts
│   ├── index.ts
│   └── test.ts
└── package.json
```

---

## 4. Application Structures

### 4.1 Morador App (Resident App)

```
projects/morador-app/
├── src/
│   ├── app/
│   │   ├── core/            # Core module (singleton services)
│   │   │   ├── services/
│   │   │   │   ├── entrega.service.ts
│   │   │   │   ├── aviso.service.ts
│   │   │   │   ├── reserva.service.ts
│   │   │   │   └── classificado.service.ts
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── features/        # Feature modules (lazy loaded)
│   │   │   ├── home/
│   │   │   ├── entregas/
│   │   │   ├── avisos/
│   │   │   ├── reservas/
│   │   │   ├── classificados/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   ├── shared/          # Shared within app
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   ├── i18n/           # Translation files
│   │   │   ├── pt-BR.json
│   │   │   └── en.json
│   │   └── images/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── styles/
│       ├── _variables.scss
│       ├── _mixins.scss
│       ├── _themes.scss
│       └── styles.scss
├── ios/
├── android/
├── capacitor.config.ts
└── package.json
```

### 4.2 Porteiro App (Doorman Web)

```
projects/porteiro-app/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   ├── registro-entregas/
│   │   │   ├── busca-morador/
│   │   │   ├── ocorrencias/
│   │   │   └── relatorios/
│   │   ├── shared/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   └── styles/
├── server.ts                 # Express server for SSR
└── package.json
```

### 4.3 Admin Panel (Síndico Web)

```
projects/admin-panel/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   ├── moradores/
│   │   │   ├── entregas/
│   │   │   ├── avisos/
│   │   │   ├── reservas/
│   │   │   ├── configuracoes/
│   │   │   ├── relatorios/
│   │   │   └── integracoes/
│   │   ├── shared/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   ├── environments/
│   └── styles/
├── server.ts
└── package.json
```

---

## 5. Module Design

### 5.1 Feature Module Pattern

```typescript
// deliveries/deliveries.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DeliveriesRoutingModule } from './deliveries-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DeliveriesRoutingModule
  ],
  declarations: [
    DeliveryListComponent,
    DeliveryDetailComponent,
    DeliveryCardComponent
  ],
  providers: [
    DeliveryService
  ]
})
export class DeliveriesModule { }
```

### 5.2 Routing Module (Lazy Loading)

```typescript
// deliveries-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { DeliveryDetailComponent } from './delivery-detail/delivery-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryListComponent,
    resolve: { preload: () => 'deliveries' }
  },
  {
    path: ':id',
    component: DeliveryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveriesRoutingModule { }
```

### 5.3 App Routes (Root)

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@shared/guards/auth.guard';
import { roleGuard } from '@shared/guards/role.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'morador',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['morador'] },
    loadChildren: () => import('./features/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'porteiro',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['porteiro'] },
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['sindico'] },
    loadChildren: () => import('./features/admin-dashboard/admin-dashboard.module')
      .then(m => m.AdminDashboardModule)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
```

---

## 6. Services

### 6.1 API Service Pattern

```typescript
// core/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    }
  );

  get client(): SupabaseClient {
    return this.supabase;
  }

  // Generic CRUD operations
  async get<T>(table: string, filters?: QueryFilters): Promise<T[]> {
    let query = this.supabase.from(table).select('*');
    
    if (filters) {
      if (filters.eq) Object.entries(filters.eq).forEach(([k, v]) => 
        query = query.eq(k, v)
      );
      if (filters.order) query = query.order(filters.order.column, 
        { ascending: filters.order.asc ?? true }
      );
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data as T[];
  }

  async getById<T>(table: string, id: string): Promise<T> {
    const { data, error } = await this.supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as T;
  }

  async create<T>(table: string, record: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(table)
      .insert(record)
      .select()
      .single();
    
    if (error) throw error;
    return data as T;
  }

  async update<T>(table: string, id: string, record: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(table)
      .update(record)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as T;
  }

  async delete(table: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Real-time subscription
  subscribe<T>(table: string, callback: (payload: T) => void): 
      RealtimeChannel {
    return this.supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table }, 
        (payload) => callback(payload as T)
      )
      .subscribe();
  }
}
```

---

## 7. State Management (NgRx)

### 7.1 Store Structure

```typescript
// app.state.ts
import { EntityState } from '@ngrx/entity';
import { Entrega, Aviso, Reserva, Morador } from '@shared/models';

export interface AppState {
  auth: AuthState;
  deliveries: EntityState<Entrega>;
  avisos: EntityState<Aviso>;
  reservas: EntityState<Reserva>;
  morador: MoradorState;
  ui: UIState;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface MoradorState {
  currentMorador: Morador | null;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark' | 'system';
  language: 'pt-BR' | 'en';
  notificationsEnabled: boolean;
}
```

### 7.2 Actions Pattern

```typescript
// delivery.actions.ts
import { createAction, props } from '@ngrx/store';
import { Entrega } from '@shared/models';

export const loadDeliveries = createAction(
  '[Deliveries] Load Deliveries'
);

export const loadDeliveriesSuccess = createAction(
  '[Deliveries] Load Deliveries Success',
  props<{ deliveries: Entrega[] }>()
);

export const loadDeliveriesFailure = createAction(
  '[Deliveries] Load Deliveries Failure',
  props<{ error: string }>()
);

export const addDelivery = createAction(
  '[Deliveries] Add Delivery',
  props<{ entrega: Entrega }>()
);

export const markDeliveryAsRead = createAction(
  '[Deliveries] Mark Delivery As Read',
  props<{ entregaId: string }>()
);
```

### 7.3 Effects Pattern

```typescript
// delivery.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ApiService } from '@shared/services/api.service';
import * as DeliveryActions from './delivery.actions';

@Injectable()
export class DeliveryEffects {
  private actions$ = inject(Actions);
  private api = inject(ApiService);

  loadDeliveries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.loadDeliveries),
      mergeMap(() =>
        this.api.get<Entrega>('entregas', { eq: { /* filters */ } }).then(
          (data) => DeliveryActions.loadDeliveriesSuccess({ deliveries: data }),
          (error) => DeliveryActions.loadDeliveriesFailure({ error: error.message })
        )
      )
    )
  );

  subscribeToRealtime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeliveryActions.loadDeliveriesSuccess),
      switchMap(() =>
        this.api.subscribe<Entrega>('entregas', (payload) => {
          if (payload.eventType === 'INSERT') {
            return DeliveryActions.addDelivery({ entrega: payload.new });
          }
          return { type: 'NO_OP' };
        })
      )
    ),
    { dispatch: false }
  );
}
```

---

## 8. Component Patterns

### 8.1 Smart/Dumb Component Pattern

```typescript
// delivery-list.component.ts (Smart)
@Component({
  selector: 'app-delivery-list',
  template: `
    <app-delivery-card
      *ngFor="let entrega of deliveries$ | async"
      [entrega]="entrega"
      (onMarkRead)="markAsRead($event)"
    ></app-delivery-card>
  `
})
export class DeliveryListComponent implements OnInit {
  private store = inject(Store);
  
  deliveries$ = this.store.select(selectAllDeliveries);
  
  ngOnInit() {
    this.store.dispatch(DeliveryActions.loadDeliveries());
  }

  markAsRead(id: string) {
    this.store.dispatch(DeliveryActions.markDeliveryAsRead({ entregaId: id }));
  }
}

@Component({
  selector: 'app-delivery-card',
  template: `
    <mat-card [class.read]="entrega.status === 'retirada'">
      <mat-card-header>
        <mat-card-title>{{ entrega.codigo_rastreamento }}</mat-card-title>
        <mat-card-subtitle>{{ entrega.transportadora }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions>
        <button mat-button (click)="onMarkRead.emit(entrega.id)">
          Marcar como retirada
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class DeliveryCardComponent {
  @Input() entrega!: Entrega;
  @Output() onMarkRead = new EventEmitter<string>();
}
```

---

## 9. HTTP Interceptors

### 9.1 Auth Interceptor

```typescript
// interceptors/auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): 
      Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req);
  }
}
```

### 9.2 Error Interceptor

```typescript
// interceptors/error.interceptor.ts
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        
        if (error.status === 403) {
          this.snackbar.open('Ação não permitida');
        }
        
        return throwError(() => error);
      })
    );
  }
}
```

---

## 10. Theming

### 10.1 Custom SCSS Structure

```scss
// styles/_variables.scss
$primary-color: #2563eb;
$secondary-color: #64748b;
$success-color: #22c55e;
$warning-color: #f59e0b;
$error-color: #ef4444;

$spacing: (
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 24px,
  xl: 32px
);

// styles/_themes.scss
.theme-light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
}

.theme-dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: #334155;
}
```

---

## 11. Environment Configuration

```typescript
// environments/environment.ts
export const environment = {
  production: false,
  supabaseUrl: 'https://[project-ref].supabase.co',
  supabaseAnonKey: '[anon-key]',
  googleClientId: '[client-id].apps.googleusercontent.com',
  whatsappApiUrl: 'https://wa.me',
  fcmSenderId: '[sender-id]'
};

// environments/environment.prod.ts
export const environment = {
  production: true,
  supabaseUrl: 'https://[project-ref].supabase.co',
  supabaseAnonKey: '[anon-key]',
  // ... other production configs
};
```