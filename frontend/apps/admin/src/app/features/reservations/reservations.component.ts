import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeComponent, ButtonComponent } from '@condomais/ui';
import { ReservationService, AuthState } from '@condomais/core';

@Component({
  selector: 'cm-admin-reservations',
  standalone: true,
  imports: [DatePipe, FormsModule, BadgeComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-page">
      <div class="admin-page__header">
        <h2 class="admin-page__title">Reservas</h2>
      </div>

      <div class="tabs">
        <button class="tab" [class.tab--active]="activeTab() === 'reservas'" (click)="activeTab.set('reservas')">Reservas</button>
        <button class="tab" [class.tab--active]="activeTab() === 'espacos'"  (click)="activeTab.set('espacos')">Espaços</button>
      </div>

      @if (activeTab() === 'reservas') {
        <div class="section">
          @if (svc.isLoading()) { <p class="hint">Carregando...</p> }
          @for (r of svc.reservations(); track r.id) {
            <div class="res-row">
              <div class="res-row__body">
                <p class="res-row__title">{{ r.equipamento?.nome ?? '—' }}</p>
                <p class="res-row__sub">{{ r.data | date:'dd/MM/yyyy':'UTC' }} · {{ r.horaInicio }}–{{ r.horaFim }}</p>
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
            @if (!svc.isLoading()) { <p class="hint">Nenhuma reserva</p> }
          }
        </div>
      }

      @if (activeTab() === 'espacos') {
        <div class="section">
          <div class="form-card">
            <h3 class="form-card__title">Novo espaço</h3>
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
                <button class="btn-toggle" [class.btn-toggle--off]="!eq.ativo" (click)="toggleEspaco(eq.id, !eq.ativo)">
                  {{ eq.ativo ? 'Ativo' : 'Inativo' }}
                </button>
              </div>
            } @empty {
              <p class="hint">Nenhum espaço cadastrado</p>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .tabs { display: flex; gap: 0; border-bottom: 2px solid #e5e7eb; margin-bottom: 1.5rem; }
    .tab { padding: .75rem 1.25rem; background: none; border: none; border-bottom: 2px solid transparent; margin-bottom: -2px; cursor: pointer; color: #6b7280; font-weight: 500; }
    .tab--active { border-bottom-color: #2d6a4f; color: #2d6a4f; }
    .res-row { display: flex; align-items: flex-start; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #e5e7eb; }
    .res-row__title { font-weight: 600; font-size: 15px; }
    .res-row__sub, .res-row__morador { font-size: 13px; color: #6b7280; }
    .res-row__right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
    .btn-cancel { font-size: 12px; color: #dc2626; background: none; border: 1px solid #dc2626; border-radius: 6px; padding: 3px 8px; cursor: pointer; }
    .form-card { background: #f9fafb; border-radius: 12px; padding: 16px; margin-bottom: 1.5rem; }
    .form-card__title { font-size: 15px; font-weight: 600; margin-bottom: 12px; }
    .form-row { display: flex; gap: 12px; margin-bottom: 12px; }
    .form-field { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .form-field label { font-size: 13px; font-weight: 500; color: #6b7280; }
    .form-input { border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; font-size: 15px; width: 100%; box-sizing: border-box; }
    .espacos-list { display: flex; flex-direction: column; gap: 12px; }
    .espaco-row { display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid #e5e7eb; border-radius: 12px; }
    .espaco-row__name { font-weight: 600; font-size: 15px; }
    .espaco-row__detail { font-size: 13px; color: #6b7280; }
    .btn-toggle { padding: 6px 14px; border-radius: 8px; border: none; cursor: pointer; font-size: 13px; font-weight: 500; background: #d1fae5; color: #065f46; }
    .btn-toggle--off { background: #fee2e2; color: #991b1b; }
    .hint { color: #9ca3af; font-size: 14px; padding: 16px 0; text-align: center; }
  `],
})
export class AdminReservationsComponent implements OnInit {
  protected readonly svc  = inject(ReservationService);
  private  readonly state = inject(AuthState);

  activeTab         = signal<'reservas' | 'espacos'>('reservas');
  isSaving          = signal(false);
  novoNome          = '';
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
