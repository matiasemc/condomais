import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthState } from '@condomais/core';

@Component({
  selector: 'cm-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Painel Master Admin</h2>
    <p>Usuário: {{ state.user()?.email }}</p>
  `,
})
export class DashboardComponent {
  state = inject(AuthState);
}