# Reservas Admin

Manage equipment and view reservations.

```typescript
// reservas-admin.component.ts
@Component({
  template: `
    <mat-tab-group>
      <mat-tab label="Reservas">
        <table mat-table [dataSource]="reservas">
          <ng-container matColumnDef="equipamento">
            <th mat-header-cell *matHeaderCellDef>Espaço</th>
            <td mat-cell *matCellDef="let r">{{ r.equipamento?.nome }}</td>
          </ng-container>
          <ng-container matColumnDef="morador">
            <th mat-header-cell *matHeaderCellDef>Morador</th>
            <td mat-cell *matCellDef="let r">{{ r.morador?.nome }}</td>
          </ng-container>
          <ng-container matColumnDef="data">
            <th mat-header-cell *matHeaderCellDef>Data</th>
            <td mat-cell *matCellDef="let r">{{ r.data | date }}</td>
          </ng-container>
          <ng-container matColumnDef="horario">
            <th mat-header-cell *matHeaderCellDef>Horário</th>
            <td mat-cell *matCellDef="let r">{{ r.hora_inicio }} - {{ r.hora_fim }}</td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let r">{{ r.status }}</td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let r">
              <button mat-icon-button *ngIf="r.status === 'confirmada'"
                      (click)="cancelar(r)">
                <mat-icon>cancel</mat-icon>
              </button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
      </mat-tab>

      <mat-tab label="Equipamentos">
        <button mat-raised-button (click)="novoEquipamento()">
          + Novo Espaço
        </button>
        <div class="equipamentos-grid">
          <mat-card *ngFor="let eq of equipamentos">
            <mat-card-title>{{ eq.nome }}</mat-card-title>
            <mat-card-content>
              <p>{{ eq.descricao }}</p>
              <p>Capacidade: {{ eq.capacidade }}</p>
            </mat-card-content>
          </mat-card>
        </div>
      </mat-tab>
    </mat-tab-group>
  `
})
export class ReservasAdminComponent {}
```