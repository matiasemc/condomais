# Feature: Reservas (Reservations)

## 1. Objective

Enable residents to book amenities (pool, BBQ, party room, gym).

---

## 2. Implementation

```typescript
// reserva.service.ts
@Injectable({ providedIn: 'root' })
export class ReservaService {
  async getEquipamentos(): Promise<Equipamento[]> {
    const morador = await this.authService.getCurrentMorador();
    
    return this.supabase
      .from('equipamentos')
      .select('*')
      .eq('condominio_id', morador.condominio_id)
      .eq('permite_reserva', true);
  }

  async getReservas(equipamentoId: string, data: string): Promise<Reserva[]> {
    return this.supabase
      .from('reservas')
      .select('*, morador:usuarios(nome)')
      .eq('equipamento_id', equipamentoId)
      .eq('data', data)
      .eq('status', 'confirmada');
  }

  async createReserva(data: {
    equipamento_id: string;
    data: string;
    hora_inicio: string;
    hora_fim: string;
    motivo?: string;
    num_convidados?: number;
  }): Promise<Reserva> {
    const morador = await this.authService.getCurrentMorador();
    
    return this.supabase
      .from('reservas')
      .insert({ ...data, morador_id: morador.id })
      .select()
      .single();
  }

  async cancelReserva(id: string): Promise<void> {
    await this.supabase
      .from('reservas')
      .update({ status: 'cancelada' })
      .eq('id', id);
  }
}

// nova-reserva.component.ts
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline">
        <mat-label>Espaço</mat-label>
        <mat-select formControlName="equipamento_id">
          <mat-option *ngFor="let eq of equipamentos" [value]="eq.id">
            {{ eq.nome }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Data</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="data">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <div class="horarios">
        <mat-form-field appearance="outline">
          <mat-label>Das</mat-label>
          <mat-select formControlName="hora_inicio">
            <mat-option *ngFor="let slot of availableSlots" [value]="slot">
              {{ slot }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Até</mat-label>
          <mat-select formControlName="hora_fim">
            <mat-option *ngFor="let slot of availableSlots" [value]="slot">
              {{ slot }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <button mat-raised-button color="primary" type="submit">
        CONFIRMAR RESERVA
      </button>
    </form>
  `
})
export class NovaReservaComponent implements OnInit {
  form = this.fb.group({
    equipamento_id: ['', Validators.required],
    data: ['', Validators.required],
    hora_inicio: ['', Validators.required],
    hora_fim: ['', Validators.required],
    motivo: [''],
    num_convidados: [null]
  });

  equipamentos: Equipamento[] = [];

  async ngOnInit() {
    this.equipamentos = await this.reservaService.getEquipamentos();
  }

  get availableSlots(): string[] {
    // Generate 1-hour slots from config
    return ['08:00', '09:00', '10:00', '11:00', '12:00', 
            '13:00', '14:00', '15:00', '16:00', '17:00', 
            '18:00', '19:00', '20:00', '21:00'];
  }

  async submit() {
    if (this.form.invalid) return;
    await this.reservaService.createReserva(this.form.value);
    this.router.navigate(['/morador/reservas']);
  }
}
```