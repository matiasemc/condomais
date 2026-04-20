import { Component, signal, computed, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent, ButtonComponent, StepperComponent, AvatarComponent, SectionHeaderComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';
import { DeliveryService, AuthState } from '@condomais/core';
import type { ResidentOption, DeliveryTipo } from '@condomais/core';

@Component({
  selector: 'cm-new-delivery',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, SearchInputComponent, ButtonComponent, StepperComponent, AvatarComponent, SectionHeaderComponent],
  templateUrl: './new-delivery.component.html',
  styleUrl: './new-delivery.component.scss',
})
export class NewDeliveryComponent {
  private readonly deliveryService = inject(DeliveryService);
  private readonly authState       = inject(AuthState);
  private readonly router          = inject(Router);
  private readonly toast           = inject(ToastService);

  readonly steps = ['Morador', 'Detalhes', 'Concluído'];
  activeStep = signal(0);

  search        = signal('');
  selected      = signal<ResidentOption | null>(null);
  deliveryType  = signal<DeliveryTipo | ''>('');
  notes         = signal('');

  readonly residents    = signal<ResidentOption[]>([]);
  readonly isLoadingRes = signal(false);

  filteredResidents = computed(() => {
    const q = this.search().toLowerCase();
    return this.residents().filter(r =>
      r.name.toLowerCase().includes(q) || r.unit.includes(q)
    );
  });

  constructor() {
    effect(() => {
      const tenant = this.authState.currentTenant();
      if (tenant) {
        this.isLoadingRes.set(true);
        this.deliveryService.loadResidents(tenant.id).then(list => {
          this.residents.set(list);
          this.isLoadingRes.set(false);
        });
      }
    });
  }

  selectResident(r: ResidentOption): void {
    this.selected.set(r);
    this.activeStep.set(1);
  }

  async confirmar(): Promise<void> {
    const tenant   = this.authState.currentTenant();
    const resident = this.selected();
    const tipo     = this.deliveryType() as DeliveryTipo;
    if (!tenant || !resident || !tipo) return;

    const delivery = await this.deliveryService.create({
      condominioId: tenant.id,
      unidade:      resident.unit,
      moradorId:    resident.id,
      tipo,
      descricao:    this.notes() || undefined,
    });

    if (delivery) {
      this.activeStep.set(2);
      this.toast.show({ message: 'Entrega registrada com sucesso', type: 'success' });
      setTimeout(() => this.router.navigate(['/entregas']), 2000);
    } else {
      this.toast.show({ message: 'Erro ao registrar entrega', type: 'error' });
    }
  }

  voltar(): void {
    if (this.activeStep() > 0) this.activeStep.update(s => s - 1);
    else this.router.navigate(['/entregas']);
  }
}