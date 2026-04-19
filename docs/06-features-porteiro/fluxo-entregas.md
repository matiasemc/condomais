# Fluxo de Entregas

## 1. Objective

Enable doorman to register package deliveries.

## 2. Implementation

```typescript
// entrega-register.component.ts
@Component({
  selector: 'app-entrega-register',
  template: `
    <div class="container">
      <h1>Nova Entrega</h1>
      
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline">
          <mat-label>Unidade</mat-label>
          <input matInput 
                 formControlName="unidade" 
                 [matAutocomplete]="auto"
                 placeholder="Ex: 204">
          <mat-autocomplete #auto="matAutocomplete"
                           [displayWith]="displayFn">
            <mat-option *ngFor="let u of unidadesFiltradas" [value]="u">
              {{ u.numero }} - {{ u.morador?.nome }}
            </mat-option>
          </mat-autocomplete>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Transportadora</mat-label>
          <mat-select formControlName="transportadora">
            <mat-option *ngFor="let t of transportadoras" [value]="t">
              {{ t }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Código de Rastreamento</mat-label>
          <input matInput formControlName="codigo_rastreamento">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Tipo</mat-label>
          <mat-select formControlName="tipo">
            <mat-option value="encomenda">Encomenda</mat-option>
            <mat-option value="sedex">Sedex</mat-option>
            <mat-option value="cafe">Café/Lanche</mat-option>
            <mat-option value="jantar">外卖</mat-option>
            <mat-option value="documento">Documento</mat-option>
            <mat-option value="medicamento">Medicamento</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Descrição</mat-label>
          <textarea matInput formControlName="descricao" rows="3"></textarea>
        </mat-form-field>

        <!-- Photo Upload -->
        <div class="photo-upload">
          <button type="button" mat-stroked-button (click)="fileInput.click()">
            <mat-icon>camera_alt</mat-icon>
            Adicionar Foto
          </button>
          <input #fileInput type="file" hidden accept="image/*"
                 (change)="onFileSelected($event)">
          <img *ngIf="previewUrl" [src]="previewUrl" class="preview">
        </div>

        <button mat-raised-button color="primary" type="submit"
                [disabled]="form.invalid">
          REGISTRAR ENTREGA
        </button>
      </form>
    </div>
  `
})
export class EntregaRegisterComponent implements OnInit {
  form = this.fb.group({
    unidade_id: ['', Validators.required],
    transportadora: ['', Validators.required],
    codigo_rastreamento: [''],
    tipo: ['encomenda'],
    descricao: [''],
    foto_url: ['']
  });

  unidades: UnidadeComMorador[] = [];
  transportadoras = [
    'Mercado Livre', 'Amazon', 'Shopee', 'Magalu', 
    'Americanas', 'Correios', 'Jadlog', 'Outros'
  ];

  ngOnInit() {
    this.loadUnidades();
  }

  async loadUnidades() {
    this.unidades = await this.unidadeService.getAll();
  }

  displayFn(u: UnidadeComMorador): string {
    return u ? `${u.morador?.nome} - Apt ${u.numero}` : '';
  }

  get unidadesFiltradas(): UnidadeComMorador[] {
    const term = this.form.get('unidade')?.value;
    if (!term) return this.unidades;
    return this.unidades.filter(u => 
      u.numero.includes(term) || 
      u.morador?.nome?.toLowerCase().includes(term.toLowerCase())
    );
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    // Preview
    this.previewUrl = URL.createObjectURL(file);
    
    // Upload
    const url = await this.storageService.upload(file, 'entregas-fotos');
    this.form.patchValue({ foto_url: url });
  }

  async submit() {
    if (this.form.invalid) return;
    
    const porteiro = await this.authService.getCurrentPorteiro();
    await this.entregaService.create({
      ...this.form.value,
      porteiro_id: porteiro.id
    });
    
    this.router.navigate(['/porteiro/dashboard']);
    this.snackBar.open('Entrega registrada com sucesso!');
  }
}
```