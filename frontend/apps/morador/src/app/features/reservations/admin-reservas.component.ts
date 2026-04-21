import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeComponent, ButtonComponent } from '@condomais/ui';
import { ReservationService, AuthState } from '@condomais/core';

@Component({
  selector: 'cm-admin-reservas',
  standalone: true,
  imports: [DatePipe, FormsModule, BadgeComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Gestão de Reservas</h1>
      </div>

      <div class="tabs">
        <button class="tab" [class.tab--active]="activeTab() === 'reservas'" (click)="activeTab.set('reservas')">Reservas</button>
        <button class="tab" [class.tab--active]="activeTab() === 'espacos'"  (click)="activeTab.set('espacos')">Espaços</button>
      </div>

      @if (activeTab() === 'reservas') {
        <div class="section">
          @if (svc.isLoading()) { <p class="loading-hint">Carregando...</p> }
          @for (r of svc.reservations(); track r.id) {
            <div class="res-row">
              <div class="res-row__body">
                <p class="res-row__title">{{ r.equipamento?.nome ?? '—' }}</p>
                <p class="res-row__sub">
                  {{ r.data | date:'dd/MM/yyyy':'UTC' }} · {{ r.horaInicio }}–{{ r.horaFim }}
                </p>
                <p class="res-row__morador">{{ r.morador?.nome ?? r.moradorId }}</p>
              </div>
              <div class="res-row__right">
                <cm-badge [variant]="r.status === 'confirmada' ? 'success' : 'warn'">{{ r.status }}</cm-badge>
                @if (r.status === 'confirmada') {
                  <button class="btn-cancel" (click)="cancelar(r.id)">Cancelar</button>
                }
              </div>
            </div>
          } @empty {
            @if (!svc.isLoading()) { <p class="empty-hint">Nenhuma reserva</p> }
          }
        </div>
      }

      @if (activeTab() === 'espacos') {
        <div class="section">
          <div class="new-espaco-form">
            <h3>Novo espaço</h3>
            <div class="form-row">
              <div class="form-field">
                <label>Nome</label>
                <input type="text" class="form-input" [(ngModel)]="novoNome" placeholder="Ex: Salão A"/>
              </div>
              <div class="form-field">
                <label>Capacidade</label>
                <input type="number" class="form-input" [(ngModel)]="novaCapacidade" placeholder="50"/>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <label>Horário início</label>
                <input type="time" class="form-input" [(ngModel)]="novoHorarioInicio"/>
              </div>
              <div class="form-field">
                <label>Horário fim</label>
                <input type="time" class="form-input" [(ngModel)]="novoHorarioFim"/>
              </div>
            </div>
            <cm-button variant="accent" size="sm" [disabled]="!novoNome || isSaving()" (clicked)="criarEspaco()">
              {{ isSaving() ? 'Salvando...' : '+ Adicionar' }}
            </cm-button>
          </div>

          <div class="espacos-list">
            @for (eq of svc.equipamentos(); track eq.id) {
              <div class="espaco-row">
                <div class="espaco-row__body">
                  <p class="espaco-row__name">{{ eq.nome }}</p>
                  <p class="espaco-row__detail">
                    {{ eq.horarioInicio }}–{{ eq.horarioFim }}
                    @if (eq.capacidade) { · Capacidade: {{ eq.capacidade }} }
                  </p>
                </div>
                <button class="btn-toggle"
                  [class.btn-toggle--off]="!eq.ativo"
                  (click)="toggleEspaco(eq.id, !eq.ativo)">
                  {{ eq.ativo ? 'Ativo' : 'Inativo' }}
                </button>
              </div>
            } @empty {
              <p class="empty-hint">Nenhum espaço cadastrado</p>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .tabs { display:flex; gap:0; border-bottom:2px solid var(--color-border,#e5e7eb); margin-bottom:1.5rem; }
    .tab { padding:.75rem 1.25rem; background:none; border:none; border-bottom:2px solid transparent; margin-bottom:-2px; cursor:pointer; color:var(--color-text-muted,#6b7280); font-weight:500; }
    .tab--active { border-bottom-color:var(--color-accent,#2563eb); color:var(--color-accent,#2563eb); }
    .res-row { display:flex; align-items:flex-start; justify-content:space-between; padding:.875rem 0; border-bottom:1px solid var(--color-border,#e5e7eb); }
    .res-row__title { font-weight:600; font-size:.9375rem; }
    .res-row__sub,.res-row__morador { font-size:.8125rem; color:var(--color-text-muted,#6b7280); }
    .res-row__right { display:flex; flex-direction:column; align-items:flex-end; gap:.375rem; }
    .btn-cancel { font-size:.75rem; color:#dc2626; background:none; border:1px solid #dc2626; border-radius:.375rem; padding:.2rem .5rem; cursor:pointer; }
    .new-espaco-form { background:var(--color-surface-raised,#f9fafb); border-radius:.75rem; padding:1rem; margin-bottom:1.5rem; }
    .new-espaco-form h3 { font-size:.9375rem; font-weight:600; margin-bottom:.75rem; }
    .form-row { display:flex; gap:.75rem; margin-bottom:.75rem; }
    .form-field { flex:1; display:flex; flex-direction:column; gap:.25rem; }
    .form-field label { font-size:.8125rem; font-weight:500; color:var(--color-text-muted,#6b7280); }
    .form-input { border:1.5px solid var(--color-border,#e5e7eb); border-radius:.5rem; padding:.5rem .75rem; font-size:.9375rem; width:100%; }
    .espacos-list { display:flex; flex-direction:column; gap:.75rem; }
    .espaco-row { display:flex; align-items:center; justify-content:space-between; padding:.75rem; border:1px solid var(--color-border,#e5e7eb); border-radius:.75rem; }
    .espaco-row__name { font-weight:600; font-size:.9375rem; }
    .espaco-row__detail { font-size:.8125rem; color:var(--color-text-muted,#6b7280); }
    .btn-toggle { padding:.375rem .875rem; border-radius:.5rem; border:none; cursor:pointer; font-size:.8125rem; font-weight:500; background:#d1fae5; color:#065f46; }
    .btn-toggle--off { background:#fee2e2; color:#991b1b; }
    .loading-hint,.empty-hint { color:var(--color-text-muted,#6b7280); font-size:.9375rem; padding:1rem 0; text-align:center; }
  `],
})
export class AdminReservasComponent implements OnInit {
  protected readonly svc  = inject(ReservationService);
  private  readonly state = inject(AuthState);

  activeTab     = signal<'reservas' | 'espacos'>('reservas');
  isSaving      = signal(false);
  novoNome      = '';
  novaCapacidade: number | null = null;
  novoHorarioInicio = '08:00';
  novoHorarioFim    = '22:00';

  async ngOnInit(): Promise<void> {
    const tenant = this.state.currentTenant();
    if (!tenant) return;
    await Promise.all([
      this.svc.loadForTenant(tenant.id),
      this.svc.loadAllEquipamentos(tenant.id),
    ]);
  }

  async cancelar(id: string): Promise<void> {
    if (!confirm('Cancelar esta reserva?')) return;
    await this.svc.cancel(id);
  }

  async criarEspaco(): Promise<void> {
    const tenant = this.state.currentTenant();
    if (!tenant || !this.novoNome) return;
    this.isSaving.set(true);
    await this.svc.createEquipamento({
      condominioId:  tenant.id,
      nome:          this.novoNome,
      capacidade:    this.novaCapacidade ?? undefined,
      horarioInicio: this.novoHorarioInicio,
      horarioFim:    this.novoHorarioFim,
    });
    this.novoNome       = '';
    this.novaCapacidade = null;
    this.isSaving.set(false);
  }

  async toggleEspaco(id: string, ativo: boolean): Promise<void> {
    await this.svc.toggleEquipamento(id, ativo);
  }
}
