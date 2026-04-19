# Ocorrências (Incidents)

## 1. Objective

Enable doorman to register building occurrences/incidents.

## 2. Table Definition

```sql
CREATE TABLE ocorrencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  porteiro_id UUID REFERENCES usuarios(id),
  
  tipo VARCHAR(50) NOT NULL
    CHECK (tipo IN (
      'entrada_suspeita',   -- Suspicious entry
      'furto',            -- Theft
      'vandalismo',       -- Vandalism
      'acidente',        -- Accident
      'ruido',           -- Noise complaint
      'entrada_nao_autorizada', -- Unauthorized entry
      'outro'            -- Other
    )),
  
  descricao TEXT NOT NULL,
  local VARCHAR(100),
  hora_ocorrido TIMESTAMPTZ,
  
  fotos TEXT[],
  
  status VARCHAR(20) DEFAULT 'aberta'
    CHECK (status IN ('aberta', 'investigando', 'resolvida', 'encerrada')),
  
  resolvida_por UUID REFERENCES usuarios(id),
  resolucao TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ocorrencias_condominio ON ocorrencias(condominio_id);
CREATE INDEX idx_ocorrencias_tipo ON ocorrencias(tipo);
```

## 3. Implementation

```typescript
// ocorrencia.service.ts
@Injectable({ providedIn: 'root' })
export class OcorrenciaService {
  async create(data: {
    tipo: string;
    descricao: string;
    local?: string;
    hora_ocorrido?: string;
    fotos?: string[];
  }): Promise<Ocorrencia> {
    return this.supabase
      .from('ocorrencias')
      .insert(data)
      .select()
      .single();
  }

  async getAll(): Promise<Ocorrencia[]> {
    return this.supabase
      .from('ocorrencias')
      .select('*')
      .order('created_at', { ascending: false });
  }
}

// ocorrencias-form.component.ts
@Component({
  template: `
    <form [formGroup]="form">
      <mat-form-field>
        <mat-label>Tipo de Ocorrência</mat-label>
        <mat-select formControlName="tipo">
          <mat-option value="entrada_suspeita">Entrada Suspeita</mat-option>
          <mat-option value="ruido">Ruído</mat-option>
          <mat-option value="vandalismo">Vandalismo</mat-option>
          <mat-option value="outro">Outro</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Descrição</mat-label>
        <textarea matInput formControlName="descricao" rows="4"></textarea>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Local</mat-label>
        <input matInput formControlName="local" placeholder="Ex: Estacionamento">
      </mat-form-field>

      <button mat-raised-button color="warn" type="submit">
        REGISTRAR OCORRÊNCIA
      </button>
    </form>
  `
})
export class NovaOcorrenciaComponent {}
```