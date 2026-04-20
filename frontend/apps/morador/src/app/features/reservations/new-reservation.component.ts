import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StepperComponent } from '@condomais/ui';
import { ButtonComponent } from '@condomais/ui';
import { ToggleComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'cm-new-reservation',
  standalone: true,
  imports: [FormsModule, StepperComponent, ButtonComponent, ToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-reservation.component.html',
  styleUrl: './new-reservation.component.scss',
})
export class NewReservationComponent {
  location = inject(Location);
  router   = inject(Router);
  toast    = inject(ToastService);

  steps = ['Espaco', 'Data e hora', 'Confirmacao'];
  step  = signal(0);

  espacos = [
    { id: 'salao-a', emoji: '🎉', nome: 'Salao A' },
    { id: 'salao-b', emoji: '🥂', nome: 'Salao B' },
    { id: 'piscina', emoji: '🏊', nome: 'Piscina' },
    { id: 'churras', emoji: '🔥', nome: 'Churrasqueira' },
  ];

  selectedEspaco = signal('');
  selectedData   = '';
  horaInicio     = '19:00';
  horaFim        = '23:00';
  googleSync     = signal(true);
}
