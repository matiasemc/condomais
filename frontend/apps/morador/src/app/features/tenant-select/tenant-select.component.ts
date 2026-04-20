import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState, TenantService } from '@condomais/core';
import type { Tenant } from '@condomais/core';
@Component({
  selector: 'cm-tenant-select', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="select-page">
      <h2>Selecione o condomínio</h2>
      @for (m of state.activeMemberships(); track m.id) {
        <button class="tb" (click)="select(m.tenant)">{{ m.tenant.nome }}</button>
      }
    </div>
  `,
  styles: [`.select-page{max-width:400px;margin:60px auto;display:flex;flex-direction:column;gap:12px;padding:24px}`,
    `.tb{padding:16px;background:var(--c-card,#fff);border:1.5px solid #ddd;border-radius:10px;cursor:pointer;font-size:15px;text-align:left}`],
})
export class TenantSelectComponent { state=inject(AuthState); tenantSvc=inject(TenantService); router=inject(Router); select(t:Tenant){this.tenantSvc.set(t);this.router.navigate(["/home"]);} }