# Email Notifications

```typescript
// email.service.ts
import { SendGridService } from '@sendgrid/mail';

async sendEmail(to: string, subject: string, html: string): Promise<void> {
  await this.sendgrid.send({
    to,
    from: 'noreply@condomais.com.br',
    subject,
    html
  });
}

// Transactional email templates
async sendWelcomeEmail(morador: Morador): Promise<void> {
  await this.sendEmail(
    morador.email,
    'Bem-vindo ao CondoMais!',
    `<h1>Bem-vindo, ${morador.nome}!</h1>
     <p>Seu cadastro no Edifício Solar do Vale foi confirmado.</p>`
  );
}
```