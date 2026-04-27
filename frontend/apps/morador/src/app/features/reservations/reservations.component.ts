import { Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BadgeComponent, ButtonComponent } from '@condomais/ui';
import { ReservationService, AuthState } from '@condomais/core';

const EQUIPAMENTO_EMOJIS: Record<string, string> = {
  salao:         'ðŸŽ‰',
  piscina:       'ðŸŠ',
  churrasqueira: 'ðŸ”¥',
  quadra:        'ðŸŽ¾',
  academia:      'ðŸ‹ï¸',
  playground:    'ðŸ›',
};

function emojiForName(nome: string): string {
  const lower = nome.toLowerCase();
  for (const [key, emoji] of Object.entries(EQUIPAMENTO_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return 'ðŸ¢';
}

@Component({
  selector: 'cm-reservations',
  standalone: true,
  imports: [RouterLink, DatePipe, BadgeComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__header">
        <h1 class="page__title">Reservas</h1>
        <cm-button variant="accent" size="sm" routerLink="/reservas/nova">+ Nova</cm-button>
      </div>

      @if (svc.isLoading()) {
        <div class="loading">Carregando...</div>
      }

      <div class="spaces">
        <p class="spaces__label">Ãreas comuns</p>
        <div class="spaces__grid">
          @for (eq of svc.equipamentos(); track eq.id) {
            <a class="space-card" [routerLink]="['/reservas/nova']" [queryParams]="{ equipamento: eq.id }">
              <span class="space-card__emoji">{{ emoji(eq.nome) }}</span>
              <span class="space-card__name">{{ eq.nome }}</span>
            </a>
          } @empty {
            @if (!svc.isLoading()) {
              <p class="empty-hint">Nenhuma Ã¡rea disponÃ­vel</p>
            }
          }
        </div>
      </div>

      <div class="list">
        <p class="list__label">Minhas reservas</p>
        @for (r of svc.reservations(); track r.id) {
          <div class="res-row">
            <div class="res-row__icon">{{ emoji(r.equipamento?.nome ?? '') }}</div>
            <div class="res-row__body">
              <p class="res-row__title">{{ r.equipamento?.nome ?? 'Ãrea' }}</p>
              <p class="res-row__sub">{{ r.data | date:'dd/MM/yyyy':'UTC' }} Â· {{ r.horaInicio }}â€“{{ r.horaFim }}</p>
            </div>
            <div class="res-row__right">
              <cm-badge [variant]="r.status === 'confirmada' ? 'success' : 'warn'">{{ r.status }}</cm-badge>
              @if (r.status === 'confirmada') {
                <button class="btn-cancel" (click)="cancelar(r.id)">Cancelar</button>
              }
            </div>
          </div>
        } @empty {
          @if (!svc.isLoading()) {
            <p class="empty-hint">Nenhuma reserva encontrada</p>
          }
        }
      </div>
    </div>
  `,
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent implements OnInit, OnDestroy {
  protected readonly svc  = inject(ReservationService);
  private  readonly state = inject(AuthState);

  emoji = emojiForName;

  async ngOnInit(): Promise<void> {
    const tenant = this.state.currentTenant();
    const user   = this.state.user();
    if (!tenant || !user) return;
    await Promise.all([
      this.svc.loadEquipamentos(tenant.id),
      this.svc.loadMyReservations(tenant.id, user.id),
    ]);
  }

  ngOnDestroy(): void {
    this.svc.stopRealtime();
  }

  async cancelar(id: string): Promise<void> {
    if (!confirm('Cancelar esta reserva?')) return;
    await this.svc.cancel(id);
  }
}
