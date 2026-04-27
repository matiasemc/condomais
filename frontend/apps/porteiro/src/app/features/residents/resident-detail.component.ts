import { Component, signal, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BadgeComponent, ButtonComponent, AvatarComponent, ListRowComponent } from '@condomais/ui';
import { AuthState, ResidentService } from '@condomais/core';
import type { ResidentProfile } from '@condomais/core';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'cm-resident-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DatePipe, BadgeComponent, ButtonComponent, AvatarComponent, ListRowComponent],
  templateUrl: './resident-detail.component.html',
  styleUrl: './resident-detail.component.css',
})
export class ResidentDetailComponent {
  private readonly authState = inject(AuthState);
  private readonly residentService = inject(ResidentService);
  private readonly toast = inject(ToastService);

  readonly resident = signal<ResidentProfile | null>(null);

  readonly pendingDeliveries = computed(() => this.resident()?.deliveries.filter(d => d.status === 'pendente') ?? []);
  readonly pastDeliveries = computed(() => this.resident()?.deliveries.filter(d => d.status === 'retirada') ?? []);

  constructor(route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id');
    const tenant = this.authState.currentTenant();
    if (id && tenant) void this.loadResident(tenant.id, id);
  }

  notificar(): void {
    this.toast.show({ message: 'Notificacao enviada via WhatsApp', type: 'success' });
  }

  private async loadResident(condominioId: string, userId: string): Promise<void> {
    this.resident.set(await this.residentService.loadProfile(condominioId, userId));
  }
}
