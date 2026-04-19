# Google Calendar Integration

```typescript
// calendar.service.ts
import { google } from 'googleapis';

async syncReservaToCalendar(reserva: Reserva): Promise<string> {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: this.tokens.access_token,
    refresh_token: this.tokens.refresh_token
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const event = {
    summary: `Reserva: ${reserva.equipamento?.nome}`,
    description: reserva.motivo,
    start: {
      dateTime: `${reserva.data}T${reserva.hora_inicio}:00`,
      timeZone: 'America/Sao_Paulo'
    },
    end: {
      dateTime: `${reserva.data}T${reserva.hora_fim}:00`,
      timeZone: 'America/Sao_Paulo'
    },
    attendees: [{ email: reserva.morador?.email }]
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event
  });

  return response.data.id;
}
```