# Master Admin - Tenant Management

## 1. Objective

Define the tenant (condominium) management functionality in the master-admin panel for the SaaS platform owner.

## 2. Features

| Feature | Description |
|--------|-------------|
| List Condominiums | View all system condominiums |
| Create Condominium | Add new building |
| Edit Condominium | Update details |
| Disable Condominium | Suspend tenant |
| View Statistics | Per-tenant analytics |

---

## 3. Implementation

### 3.1 List Condominiums

```typescript
// condominios.service.ts
async getAll(): Promise<Condominio[]> {
  return supabase
    .from('condominios')
    .select('*')
    .order('nome');
}

async getById(id: string): Promise<Condominio> {
  return supabase
    .from('condominios')
    .select('*, user_count, delivery_count')
    .eq('id', id)
    .single();
}
```

### 3.2 Create Condominium

```typescript
interface CreateCondominioInput {
  cnpj: string;
  nome: string;
  nome_fantasia?: string;
  subdomain: string;
  telefone?: string;
  whatsapp?: string;
  email?: string;
}

async create(data: CreateCondominioInput): Promise<Condominio> {
  // Verify CNPJ not exists
  // Verify subdomain not exists
  
  return supabase
    .from('condominios')
    .insert(data)
    .select()
    .single();
}
```

---

## 4. Dashboard View

```typescript
// master-admin-dashboard.component.ts
@Component({
  template: `
    <div class="stats">
      <mat-card>
        <mat-card-title>{{ stats.totalCondominios }}</mat-card-title>
        <mat-card-subtitle>Condomínios Ativos</mat-card-subtitle>
      </mat-card>
      <mat-card>
        <mat-card-title>{{ stats.totalUsers }}</mat-card-title>
        <mat-card-subtitle>Usuários Totais</mat-card-subtitle>
      </mat-card>
    </div>
  `
})
export class DashboardComponent {}
```