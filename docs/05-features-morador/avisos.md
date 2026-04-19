# Feature: Avisos (Announcements)

## 1. Objective

Enable residents to view building announcements from Síndico.

## 2. User Stories

- View list of announcements
- View announcement details
- Mark as read
- Acknowledge important notices

---

## 3. Implementation

```typescript
// aviso.service.ts
@Injectable({ providedIn: 'root' })
export class AvisoService {
  async getAvisos(): Promise<Aviso[]> {
    const morador = await this.authService.getCurrentMorador();
    
    return this.supabase
      .from('avisos')
      .select('*, sindico:usuarios(nome)')
      .eq('condominio_id', morador.condominio_id)
      .eq('status', 'publicado')
      .order('created_at', { ascending: false });
  }

  async markAsRead(avisoId: string): Promise<void> {
    const user = await this.authService.getCurrentUser();
    
    await this.supabase.from('aviso_leituras').upsert({
      aviso_id: avisoId,
      morador_id: user.id,
      lida_em: new Date().toISOString()
    });
  }
}

//aviso-list.component.ts
@Component({
  template: `
    <app-header title="Avisos"></app-header>
    
    <div class="avisos-list">
      <app-aviso-card
        *ngFor="let aviso of avisos"
        [aviso]="aviso"
        [class.urgente]="aviso.prioridade === 'urgente'"
        (click)="openDetail(aviso)"
      ></app-aviso-card>
    </div>
  `
})
export class AvisoListComponent implements OnInit {
  avisos: Aviso[] = [];
  
  async ngOnInit() {
    this.avisos = await this.avisoService.getAvisos();
  }
}
```

---

## 4. Priority Styles

```scss
.aviso-card {
  &.urgente {
    border-left: 4px solid $error-color;
    background: rgba($error-color, 0.05);
  }
  
  &.importante {
    border-left: 4px solid $warning-color;
  }
}
```