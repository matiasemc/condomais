# Tenant Switching (Morador App)

## 1. Objective

Enable residents who belong to multiple condominiums to switch between them in the morador app.

## 2. Implementation

```typescript
// tenant-switcher.component.ts
@Component({
  template: `
    <mat-nav-list>
      <mat-list-item *ngFor="let m of memberships" (click)="switchTo(m.condominio_id)">
        <span matListItemTitle>{{ m.condominio.nome }}</span>
        <span matListItemLine>{{ m.role }}</span>
      </mat-list-item>
    </mat-nav-list>
  `
})
export class TenantSwitcherComponent {
  memberships = this.store.select(selectMemberships);
  
  switchTo(condominioId: string) {
    this.tenantService.selectCondominio(condominioId);
    this.router.navigate(['/morador/home']);
  }
}
```