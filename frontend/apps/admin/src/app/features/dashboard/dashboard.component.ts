import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthState } from '@condomais/core';
@Component({ selector: 'cm-dashboard', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h2>Painel Admin</h2><p>Condomínio: {{state.currentTenant()?.nome}}</p><p>Perfil: {{state.currentRole()}}</p>' })
export class DashboardComponent { state=inject(AuthState); }