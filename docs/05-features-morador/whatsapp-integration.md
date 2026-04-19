# WhatsApp Integration

## 1. Objective

Enable residents to contact Síndico via WhatsApp deep link.

## 2. Implementation

```typescript
// whatsapp.service.ts
@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  async openWhatsApp(mensagem?: string): Promise<void> {
    const condominio = await this.condominioService.getCurrent();
    const telefone = condominio.whatsapp;
    
    if (!telefone) {
      throw new Error('WhatsApp não configurado');
    }

    const url = this.buildDeepLink(telefone, mensagem);
    window.open(url, '_blank');
  }

  private buildDeepLink(telefone: string, mensagem?: string): string {
    const clean = telefone.replace(/\D/g, '');
    const msg = encodeURIComponent(mensagem || '');
    return `https://wa.me/${clean}?text=${msg}`;
  }
}

// Contact Sindico Button
@Component({
  template: `
    <button mat-fab color="primary" (click)="contactSindico()">
      <mat-icon>chat</mat-icon>
    </button>
  `
})
export class WhatsAppButtonComponent {
  constructor(private ws: WhatsAppService) {}

  async contactSindico() {
    const condominio = await this.condominioService.getCurrent();
    const mensagem = `Olá, preciso de informações sobre o Apt ${condominio.unidade}`;
    await this.ws.openWhatsApp(mensagem);
  }
}
```