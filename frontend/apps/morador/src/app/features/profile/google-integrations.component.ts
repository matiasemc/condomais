import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Location } from '@angular/common';
import { ToggleComponent } from '@condomais/ui';
import { ButtonComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'cm-google-integrations',
  standalone: true,
  imports: [ToggleComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './google-integrations.component.html',
  styleUrl: './google-integrations.component.css',
})
export class GoogleIntegrationsComponent {
  location         = inject(Location);
  toast            = inject(ToastService);
  connected        = signal(false);
  calendar         = signal(true);
  emailDelivery    = signal(true);
  emailReservation = signal(true);

  toggleConnect(): void {
    this.connected.update(v => !v);
    this.toast.show({ message: this.connected() ? 'Google conectado!' : 'Google desconectado', duration: 2000 });
  }
}
