import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService, AuthState } from '@condomais/core';
@Component({
  selector: 'cm-admin-shell', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [RouterOutlet],
  template: `<div class='s'><header class='h'><b>CondoMais Admin</b><span>{{ state.currentTenant()?.nome }}</span><button (click)='auth.logout()'>Sair</button></header><main><router-outlet></router-outlet></main></div>`,
  styles: ['.s{display:flex;flex-direction:column;min-height:100vh}.h{display:flex;align-items:center;gap:16px;padding:16px 24px;background:#2d6a4f;color:#fff} b{flex:1} main{padding:24px}']
})
export class ShellComponent { auth=inject(AuthService); state=inject(AuthState); }