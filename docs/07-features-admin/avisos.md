# Avisos Admin

Create and manage announcements.

```typescript
// aviso-form.component.ts
@Component({
  selector: 'app-aviso-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline">
        <mat-label>Título</mat-label>
        <input matInput formControlName="titulo">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Mensagem</mat-label>
        <textarea matInput formControlName="mensagem" rows="6"></textarea>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Prioridade</mat-label>
        <mat-select formControlName="prioridade">
          <mat-option value="normal">Normal</mat-option>
          <mat-option value="importante">Importante</mat-option>
          <mat-option value="urgente">Urgente</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Expira em</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="data_expiracao">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button">SALVAR RASCUNHO</button>
        <button mat-raised-button color="primary" type="submit">
          PUBLICAR
        </button>
      </div>
    </form>
  `
})
export class AvisoFormComponent {
  form = this.fb.group({
    titulo: ['', Validators.required],
    mensagem: ['', Validators.required],
    prioridade: ['normal'],
    data_expiracao: [null]
  });

  async submit() {
    const sindico = await this.authService.getCurrentSindico();
    await this.supabase.from('avisos').insert({
      ...this.form.value,
      condominio_id: sindico.condominio_id,
      sindico_id: sindico.id,
      status: 'publicado'
    });
  }
}
```