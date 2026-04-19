# Entregas Admin

Manage all deliveries in the building.

```typescript
//admin-entregas.component.ts
@Component({
  template: `
    <div class="filters">
      <mat-form-field>
        <mat-label>Status</mat-label>
        <mat-select [(value)]="statusFilter" (selectionChange)="load()">
          <mat-option value="">Todos</mat-option>
          <mat-option value="pendente">Pendente</mat-option>
          <mat-option value="retirada">Retirada</mat-option>
          <mat-option value="expirada">Expirada</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Data</mat-label>
        <input matInput [matDatepicker]="picker" (dateChange)="load()">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
    </div>

    <table mat-table [dataSource]="entregas">
      <ng-container matColumnDef="unidade">
        <th mat-header-cell *matHeaderCellDef>Unidade</th>
        <td mat-cell *matCellDef="let e">{{ e.unidade?.numero }}</td>
      </ng-container>

      <ng-container matColumnDef="transportadora">
        <th mat-header-cell *matHeaderCellDef>Transportadora</th>
        <td mat-cell *matCellDef="let e">{{ e.transportadora }}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let e">
          <span class="status-badge" [class]="e.status">{{ e.status }}</span>
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let e">
          <button mat-icon-button (click)="markRetirada(e)">
            <mat-icon>check</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>
    </table>
  `
})
export class AdminEntregasComponent {}
```