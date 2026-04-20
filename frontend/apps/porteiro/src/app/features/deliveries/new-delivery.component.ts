import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent, ButtonComponent, StepperComponent, AvatarComponent, SectionHeaderComponent, BadgeComponent } from '@condomais/ui';
import { ToastService } from '../../core/toast.service';

interface ResidentOption {
  id: string; name: string; unit: string;
}

@Component({
  selector: 'cm-new-delivery',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, SearchInputComponent, ButtonComponent, StepperComponent, AvatarComponent, SectionHeaderComponent, BadgeComponent],
  templateUrl: './new-delivery.component.html',
  styleUrl: './new-delivery.component.scss',
})
export class NewDeliveryComponent {
  readonly steps = ['Morador', 'Detalhes', 'Concluído'];
  activeStep = signal(0);

  search = signal("");
  selected = signal<ResidentOption | null>(null);
  deliveryType = signal("");
  notes = signal("");

  readonly residents: ResidentOption[] = [
    { id: '1', name: 'Ana Lima',       unit: '101' },
    { id: '2', name: 'Bruno Costa',    unit: '102' },
    { id: '3', name: 'Carla Souza',    unit: '201' },
    { id: '4', name: 'Elisa Ferreira', unit: '301' },
    { id: '5', name: 'Felipe Nunes',   unit: '302' },
  ];

  filteredResidents = () => {
    const q = this.search().toLowerCase();
    return this.residents.filter(r => r.name.toLowerCase().includes(q) || r.unit.includes(q));
  };

  constructor(private router: Router, private toast: ToastService) {}

  selectResident(r: ResidentOption) {
    this.selected.set(r);
    this.activeStep.set(1);
  }

  confirmar() {
    this.activeStep.set(2);
    this.toast.show({ message: "Entrega registrada com sucesso", type: "success" });
    setTimeout(() => this.router.navigate(["/entregas"]), 2000);
  }

  voltar() {
    if (this.activeStep() > 0) this.activeStep.update(s => s - 1);
    else this.router.navigate(["/entregas"]);
  }
}