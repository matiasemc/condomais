import { Component, ChangeDetectionStrategy, signal, inject, OnInit, computed } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StepperComponent, ButtonComponent, ToggleComponent } from '@condomais/ui';
import { ReservationService, GoogleCalendarService, AuthState } from '@condomais/core';
import type { Reservation } from '@condomais/core';
import { ToastService } from '../../core/toast.service';

const EQUIPAMENTO_EMOJIS: Record<string, string> = {
  salao:         'ðŸŽ‰',
  piscina:       'ðŸŠ',
  churrasqueira: 'ðŸ”¥',
  quadra:        'ðŸŽ¾',
  academia:      'ðŸ‹ï¸',
};

function emojiForName(nome: string): string {
  const lower = nome.toLowerCase();
  for (const [key, emoji] of Object.entries(EQUIPAMENTO_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return 'ðŸ¢';
}

@Component({
  selector: 'cm-new-reservation',
  standalone: true,
  imports: [FormsModule, StepperComponent, ButtonComponent, ToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-reservation.component.html',
  styleUrl: './new-reservation.component.css',
})
export class NewReservationComponent implements OnInit {
  location  = inject(Location);
  router    = inject(Router);
  route     = inject(ActivatedRoute);
  toast     = inject(ToastService);
  svc       = inject(ReservationService);
  calSvc    = inject(GoogleCalendarService);
  state     = inject(AuthState);

  steps = ['EspaÃ§o', 'Data e hora', 'ConfirmaÃ§Ã£o'];
  step  = signal(0);

  selectedEquipamentoId = signal('');
  selectedData          = '';
  horaInicio            = '19:00';
  horaFim               = '23:00';
  googleSync            = signal(true);
  isSubmitting          = signal(false);
  confirmedReservation  = signal<Reservation | null>(null);

  selectedEquipamento = computed(() =>
    this.svc.equipamentos().find(e => e.id === this.selectedEquipamentoId()) ?? null,
  );

  emoji = emojiForName;

  async ngOnInit(): Promise<void> {
    const tenant = this.state.currentTenant();
    if (!tenant) return;
    await this.svc.loadEquipamentos(tenant.id);

    const preselect = this.route.snapshot.queryParamMap.get('equipamento');
    if (preselect) this.selectedEquipamentoId.set(preselect);

    this.googleSync.set(this.calSvc.isConnected());
  }

  get todayMin(): string {
    return new Date().toISOString().split('T')[0];
  }

  canProceedStep1(): boolean {
    return !!this.selectedEquipamentoId();
  }

  canProceedStep2(): boolean {
    return !!this.selectedData && !!this.horaInicio && !!this.horaFim
      && this.horaFim > this.horaInicio;
  }

  async submit(): Promise<void> {
    if (!this.canProceedStep2()) return;
    const tenant = this.state.currentTenant();
    const user   = this.state.user();
    if (!tenant || !user) return;

    this.isSubmitting.set(true);
    this.svc.error.set(null);

    const reservation = await this.svc.create({
      condominioId:  tenant.id,
      equipamentoId: this.selectedEquipamentoId(),
      moradorId:     user.id,
      data:          this.selectedData,
      horaInicio:    this.horaInicio,
      horaFim:       this.horaFim,
    });

    if (!reservation) {
      const msg = this.svc.error() ?? 'Erro ao criar reserva';
      this.toast.show({ message: msg, duration: 3000 });
      this.isSubmitting.set(false);
      return;
    }

    if (this.googleSync() && this.calSvc.isConnected()) {
      const eq = this.selectedEquipamento();
      if (eq) {
        const eventId = await this.calSvc.createEvent(reservation, eq);
        if (eventId) {
          await this.svc.updateGoogleEventId(reservation.id, eventId, 'primary');
        }
      }
    }

    this.confirmedReservation.set(reservation);
    this.isSubmitting.set(false);
    this.step.set(2);
  }
}
