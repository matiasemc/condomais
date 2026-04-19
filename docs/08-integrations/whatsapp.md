# WhatsApp Integration

## 1. Objective

Define WhatsApp integration for direct communication.

## 2. Deep Link Implementation

```typescript
// whatsapp.service.ts
@Injectable({ providedIn: 'root' })
export class WhatsAppService {
  openWhatsApp(phone: string, message?: string): void {
    const clean = phone.replace(/\D/g, '');
    const url = `https://wa.me/${clean}?text=${encodeURIComponent(message || '')}`;
    window.open(url, '_blank');
  }
}

// phone number format: 5511999999999
// WhatsApp deep link: https://wa.me/5511999999999?text=Hello
```