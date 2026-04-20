import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KpiCardComponent } from '../../../../../libs/ui/src/lib/components/kpi-card/kpi-card.component';
import { BadgeComponent } from '../../../../../libs/ui/src/lib/components/badge/badge.component';

@Component({
  selector: 'cm-porteiro-home',
  standalone: true,
  imports: [RouterLink, KpiCardComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  kpis = [
    { label: 'Entregas hoje',       value: 7,  inverted: true },
    { label: 'Aguardando retirada', value: 4,  inverted: false },
    { label: 'Avisos ativos',       value: 2,  inverted: false },
    { label: 'Ocorrencias abertas', value: 2,  inverted: false },
  ];

  recentDeliveries = [
    { id: '1', morador: 'Helena A.', apto: '1204 B', remetente: 'Mercado Livre', status: 'pendente' },
    { id: '2', morador: 'Mariana C.', apto: '605 A', remetente: 'Amazon', status: 'pendente' },
    { id: '3', morador: 'Pedro S.', apto: '302 B', remetente: 'Shopee', status: 'retirada' },
  ];
}
