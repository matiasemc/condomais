# Configurações

Configure condominium settings.

```typescript
// configuracoes.component.ts
@Component({
  selector: 'app-configuracoes',
  template: `
    <div class="config-sections">
      <!-- Informações do Condomínio -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Informações</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="infoForm">
            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="nome">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>CNPJ</mat-label>
              <input matInput formControlName="cnpj">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Telefone</mat-label>
              <input matInput formControlName="telefone">
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>WhatsApp</mat-label>
              <input matInput formControlName="whatsapp">
            </mat-form-field>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Configurações de Entregas -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Entregas</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-slide-toggle formControlName="foto_obrigatoria">
            Foto obrigatória
          </mat-slide-toggle>
          <mat-slide-toggle formControlName="notificar_whatsapp">
            Notificar WhatsApp
          </mat-slide-toggle>
          <mat-form-field appearance="outline">
            <mat-label>Dias de retenção</mat-label>
            <input matInput type="number" formControlName="retencao_dias">
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <!-- Configurações de Reservas -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Reservas</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline">
            <mat-label>Antecedência mínima (horas)</mat-label>
            <input matInput type="number" formControlName="antecedencia_minima">
          </mat-form-field>
          <mat-slide-toggle formControlName="permitir_cancelamento">
            Permitir cancelamento
          </mat-slide-toggle>
        </mat-card-content>
      </mat-card>

      <button mat-raised-button color="primary" (click)="salvar()">
        SALVAR ALTERAÇÕES
      </button>
    </div>
  `
})
export class ConfiguracoesComponent {
  infoForm = this.fb.group({
    nome: [''],
    cnpj: [''],
    telefone: [''],
    whatsapp: ['']
  });

  configForm = this.fb.group({
    foto_obrigatoria: [false],
    notificar_whatsapp: [true],
    retencao_dias: [90],
    antecedencia_minima: [24],
    permitir_cancelamento: [true]
  });

  async salvar() {
    // Update condominio
    await this.supabase
      .from('condominios')
      .update({
        nome: this.infoForm.value.nome,
        telefone: this.infoForm.value.telefone,
        whatsapp: this.infoForm.value.whatsapp,
        config_entregas: this.configForm.value
      })
      .eq('id', this.tenantId);
  }
}
```