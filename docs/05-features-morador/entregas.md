# Feature: Entregas (Deliveries)

## 1. Objective

Enable residents to view and track package deliveries sent to their unit.

## 2. User Stories

- View list of pending deliveries
- View delivery details (tracking, courier, photo)
- Mark delivery as picked up
- Receive push notification on new delivery

---

## 3. Step-by-Step Implementation

### Step 1: API Service

```typescript
// entrega.service.ts
@Injectable({ providedIn: 'root' })
export class EntregaService {
  private supabase = inject(ApiService).client;

  async getMyDeliveries(): Promise<Entrega[]> {
    const morador = await this.authService.getCurrentMorador();
    
    const { data, error } = await this.supabase
      .from('entregas')
      .select('*, unidade:unidades(numero), porteiro:usuarios(nome)')
      .eq('unidade_id', morador.unidade_id)
      .neq('status', 'retirada')
      .neq('status', 'devolvida')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async getEntregaById(id: string): Promise<Entrega> {
    const { data, error } = await this.supabase
      .from('entregas')
      .select('*, unidade:unidades(numero), porteiro:usuarios(nome)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async markAsRetrieved(id: string, quemRetirou: string): Promise<void> {
    const { error } = await this.supabase
      .from('entregas')
      .update({
        status: 'retirada',
        data_retirada: new Date().toISOString(),
        quem_retirou: quemRetirou
      })
      .eq('id', id);

    if (error) throw error;
  }
}
```

### Step 2: List Component

```typescript
// entrega-list.component.ts
@Component({
  selector: 'app-entrega-list',
  template: `
    <app-header title="Entregas"></app-header>
    
    <div class="content">
      <app-loading *ngIf="loading"></app-loading>
      
      <app-empty-state
        *ngIf="!loading && entregas.length === 0"
        icon="📦"
        message="Nenhuma entrega registrada"
        submessage="Suas entregas aparecerão aqui"
      ></app-empty-state>
      
      <div class="entrega-list">
        <app-entrega-card
          *ngFor="let entrega of entregas"
          [entrega]="entrega"
          (click)="openDetail(entrega)"
        ></app-entrega-card>
      </div>
    </div>
  `
})
export class EntregaListComponent implements OnInit {
  entregas: Entrega[] = [];
  loading = true;

  ngOnInit() {
    this.loadDeliveries();
    this.subscribeToRealtime();
  }

  async loadDeliveries() {
    this.entregas = await this.entregaService.getMyDeliveries();
    this.loading = false;
  }

  private subscribeToRealtime() {
    this.supabase
      .channel('entregas')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'entregas',
        filter: `unidade_id=eq.${this.morador.unidade_id}`
      }, (payload) => {
        // Show notification for new delivery
        this.notificationService.show(
          'Nova entrega! 📦',
          `Pacote chegou para Apt ${payload.new.unidade_numero}`
        );
        this.entregas.unshift(payload.new);
      })
      .subscribe();
  }
}
```

### Step 3: Card Component

```typescript
// entrega-card.component.ts
@Component({
  selector: 'app-entrega-card',
  template: `
    <mat-card [class.pendente]="entrega.status === 'pendente'">
      <mat-card-header>
        <img mat-card-avatar [src]="entrega.foto_url || '/assets/package.png'">
        <mat-card-title>{{ entrega.transportadora }}</mat-card-title>
        <mat-card-subtitle>
          {{ entrega.codigo_rastreamento || 'Sem código' }}
        </mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="info">
          <mat-icon>schedule</mat-icon>
          <span>{{ entrega.created_at | date:'dd/MM/yyyy HH:mm' }}</span>
        </div>
        <div class="info">
          <mat-icon>home</mat-icon>
          <span>{{ entrega.unidade?.numero }}</span>
        </div>
      </mat-card-content>
      
      <mat-card-actions align="end">
        <button mat-button color="primary" (click)="onView()">
          VER DETALHES
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class EntregaCardComponent {
  @Input() entrega!: Entrega;
  @Output() click = new EventEmitter<Entrega>();
}
```

---

## 4. Technical Details

### 4.1 Data Model

```typescript
interface Entrega {
  id: string;
  condominio_id: string;
  unidade_id: string;
  porteiro_id: string;
  codigo_rastreamento: string;
  transportadora: string;
  tipo: string;
  descricao: string;
  foto_url: string;
  status: string;
  data_retirada: string;
  quem_retirou: string;
  created_at: string;
  unidade: { numero: string };
  porteiro: { nome: string };
}
```

### 4.2 Notification Payload

```typescript
interface DeliveryNotification {
  title: 'Nova entrega! 📦';
  body: 'Pacote da {transportadora} chegou para Apt {numero}';
  data: {
    type: 'delivery';
    entrega_id: string;
  };
}
```

---

## 5. Dependencies

- ApiService
- AuthService (getCurrentMorador)
- Supabase Realtime subscription