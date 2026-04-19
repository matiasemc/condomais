# Moradores Management

## 1. Objective

Enable Síndico to manage resident accounts.

```typescript
// moradores.service.ts
@Injectable({ providedIn: 'root' })
export class MoradorService {
  async getAll(): Promise<Morador[]> {
    return this.supabase
      .from('usuarios')
      .select('*, unidade:unidades(numero, bloco)')
      .eq('role', 'morador')
      .eq('condominio_id', this.tenantId);
  }

  async create(morador: {
    nome: string;
    email: string;
    telefone: string;
    unidade_id: string;
  }): Promise<Morador> {
    // Create auth user
    const { data: authData } = await this.supabase.auth.admin.createUser({
      email: morador.email,
      email_confirm: true
    });

    // Create morador record
    return this.supabase
      .from('usuarios')
      .insert({
        auth_id: authData.user.id,
        condominio_id: this.tenantId,
        ...morador,
        role: 'morador',
        status: 'pending'
      })
      .select()
      .single();
  }

  async update(id: string, data: Partial<Morador>): Promise<Morador> {
    return this.supabase
      .from('usuarios')
      .update(data)
      .eq('id', id)
      .select()
      .single();
  }

  async deactivate(id: string): Promise<void> {
    await this.supabase
      .from('usuarios')
      .update({ status: 'inactive' })
      .eq('id', id);
  }
}
```