import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState, TenantService } from '@condomais/core';
import type { Tenant } from '@condomais/core';
@Component({
  selector: 'cm-tenant-select', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class='w'><h2>Selecione o condomínio</h2>@for(m of state.activeMemberships(); track m.id){<button class='tb' (click)='select(m.tenant)'><span>{{m.tenant.nome}}</span><span class='r'>{{m.role}}</span></button>}</div>`,
  styles: ['.w{max-width:480px;margin:60px auto;display:flex;flex-direction:column;gap:12px}.tb{display:flex;justify-content:space-between;padding:16px 20px;background:#fff;border:1.5px solid #ddd;border-radius:10px;cursor:pointer;font-size:15px}.r{color:#888;font-size:13px}']
})
export class TenantSelectComponent { state=inject(AuthState); tenantSvc=inject(TenantService); router=inject(Router); select(t: Tenant){this.tenantSvc.set(t);this.router.navigate(["/dashboard"]);} }