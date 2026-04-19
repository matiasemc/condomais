# Admin Dashboard

## 1. Objective

Define Síndico admin dashboard with key metrics.

## 2. Dashboard Layout

```typescript
// dashboard.component.ts
@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <h1>Painel do Síndico</h1>
      
      <!-- Stats Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-value">{{ stats.entregasHoje }}</div>
            <div class="stat-label">Entregas Hoje</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-value">{{ stats.totalMoradores }}</div>
            <div class="stat-label">Moradores</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-value">{{ stats.reservasMes }}</div>
            <div class="stat-label">Reservas Mês</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-value">{{ stats.avisos }}</div>
            <div class="stat-label">Avisos Ativos</div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Recent Activity -->
      <div class="recent-activity">
        <h2>Atividade Recente</h2>
        <mat-list>
          <mat-list-item *ngFor="let item of activity">
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <div matListItemTitle>{{ item.title }}</div>
            <div matListItemLine>{{ item.time }}</div>
          </mat-list-item>
        </mat-list>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats = { entregasHoje: 0, totalMoradores: 0, reservasMes: 0, avisos: 0 };
  activity: Activity[] = [];

  async ngOnInit() {
    this.stats = await this.dashboardService.getStats();
    this.activity = await this.dashboardService.getActivity();
  }
}
```