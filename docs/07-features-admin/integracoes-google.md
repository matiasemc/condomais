# Google Integrations Admin

Configure Google OAuth and Calendar.

```typescript
// integracoes-google.component.ts
@Component({
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Google OAuth</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Permitir login com Conta Google</p>
        <mat-slide-toggle [(ngModel)]="config.google_oauth_enabled">
          Habilitado
        </mat-slide-toggle>

        <mat-form-field appearance="outline">
          <mat-label>Client ID</mat-label>
          <input matInput [(ngModel)]="config.google_client_id">
        </mat-form-field>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-header>
        <mat-card-title>Google Calendar</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Sincronizar reservas com Google Calendar</p>
        <mat-slide-toggle [(ngModel)]="config.google_calendar_enabled">
          Habilitado
        </mat-slide-toggle>

        <button mat-stroked-button 
                *ngIf="!config.google_calendar_connected"
                (click)="connectGoogleCalendar()">
          Conectar Google Calendar
        </button>

        <div *ngIf="config.google_calendar_connected" class="connected">
          <mat-icon>check_circle</mat-icon>
          <span>Calendário conectado</span>
          <button mat-button (click)="disconnectGoogleCalendar()">
            Desconectar
          </button>
        </div>
      </mat-card-content>
    </mat-card>

    <button mat-raised-button color="primary" (click)="save()">
      SALVAR
    </button>
  `
})
export class IntegracoesGoogleComponent {
  config = { google_oauth_enabled: true };

  async connectGoogleCalendar() {
    // Redirect to Google OAuth
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar');

    const result = await signInWithPopup(this.auth, provider);
    // Store tokens for sync
  }
}
```