# Busca Morador

## 1. Objective

Enable doorman to quickly find resident information.

## 2. Implementation

```typescript
// busca-morador.component.ts
@Component({
  selector: 'app-busca-morador',
  template: `
    <div class="container">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Buscar Morador</mat-label>
        <input matInput 
               [formControl]="searchControl"
               placeholder="Nome, apartamento ou telefone"
               autocomplete="off">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="results">
        <mat-card *ngFor="let m of results$ | async" 
                  class="morador-card"
                  (click)="selectMorador(m)">
          <mat-card-header>
            <img mat-card-avatar [src]="m.foto_url || defaultAvatar">
            <mat-card-title>{{ m.nome }}</mat-card-title>
            <mat-card-subtitle>Apt {{ m.unidade?.numero }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p><mat-icon>phone</mat-icon> {{ m.telefone }}</p>
            <p><mat-icon>email</mat-icon> {{ m.email }}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class BuscaMoradorComponent implements OnInit {
  searchControl = new FormControl('');
  results$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.search(term || ''))
  );

  constructor(private moradorService: MoradorService) {}

  search(term: string): Observable<Morador[]> {
    return this.moradorService.search(term);
  }

  selectMorador(morador: Morador) {
    // Show morador details or action menu
  }
}
```

### Search Service

```typescript
// Uses PostgreSQL full-text search
async search(term: string): Promise<Morador[]> {
  const { data } = await this.supabase
    .from('usuarios')
    .select('id, nome, telefone, email, foto_url, unidade:unidades(numero)')
    .eq('role', 'morador')
    .eq('condominio_id', this.tenantId)
    .or(`nome.ilike.*${term}*,telefone.ilike.*${term}*,unidades.numero.ilike.*${term}*`)
    .limit(20);
  return data;
}
```