# Feature: Classificados (Marketplace)

## 1. Objective

Enable residents to buy, sell, trade items within the building.

```typescript
// classificado.service.ts
@Injectable({ providedIn: 'root' })
export class ClassificadoService {
  async getClassificados(categoria?: string): Promise<Classificado[]> {
    const morador = await this.authService.getCurrentMorador();
    let query = this.supabase
      .from('classificados')
      .select('*, morador:usuarios(nome, unidade_id)')
      .eq('condominio_id', morador.condominio_id)
      .eq('status', 'active');
    
    if (categoria) query = query.eq('categoria', categoria);
    return query;
  }

  async createClassificado(data: {
    titulo: string;
    descricao: string;
    preco?: number;
    categoria: string;
    fotos?: string[];
  }): Promise<Classificado> {
    const morador = await this.authService.getCurrentMorador();
    return this.supabase
      .from('classificados')
      .insert({ ...data, morador_id: morador.id })
      .select()
      .single();
  }

  async markAsSold(id: string): Promise<void> {
    await this.supabase
      .from('classificados')
      .update({ status: 'vendido' })
      .eq('id', id);
  }
}

// classificados-list.component.ts
@Component({
  template: `
    <div class="tabs">
      <mat-tab-group>
        <mat-tab label="Vendas"></mat-tab>
        <mat-tab label="Compras"></mat-tab>
        <mat-tab label="Trocas"></mat-tab>
        <mat-tab label="Serviços"></mat-tab>
      </mat-tab-group>
    </div>

    <div class="grid">
      <app-classificado-card
        *ngFor="let item of classificados"
        [item]="item"
      ></app-classificado-card>
    </div>
  `
})
export class ClassificadosPageComponent {}
```