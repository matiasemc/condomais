import { Injectable, inject, signal } from '@angular/core';
import { SUPABASE_CLIENT } from './supabase-client.service';
import type { Reservation, Equipamento } from '../interfaces/index.model';

const STORAGE_KEY = 'cm_google_tokens';
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
const TZ = 'America/Sao_Paulo';

interface GoogleTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

@Injectable({ providedIn: 'root' })
export class GoogleCalendarService {
  private readonly supabase = inject(SUPABASE_CLIENT);

  readonly isConnected = signal(false);

  constructor() {
    this.isConnected.set(this.loadTokens() !== null);
  }

  // â”€â”€ Token management â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  private loadTokens(): GoogleTokens | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as GoogleTokens;
    } catch {
      return null;
    }
  }

  private saveTokens(tokens: GoogleTokens): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    this.isConnected.set(true);
  }

  disconnect(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.isConnected.set(false);
  }

  storeTokensFromOAuth(accessToken: string, refreshToken?: string, expiresIn = 3600): void {
    this.saveTokens({
      accessToken,
      refreshToken,
      expiresAt: Date.now() + expiresIn * 1000,
    });
  }

  private async getValidAccessToken(): Promise<string | null> {
    const tokens = this.loadTokens();
    if (!tokens) return null;

    if (Date.now() < tokens.expiresAt - 60_000) {
      return tokens.accessToken;
    }

    if (!tokens.refreshToken) {
      this.disconnect();
      return null;
    }

    try {
      const { data, error } = await this.supabase.functions.invoke('google-token-refresh', {
        body: { refreshToken: tokens.refreshToken },
      });
      if (error || !data?.access_token) {
        this.disconnect();
        return null;
      }
      this.saveTokens({
        ...tokens,
        accessToken: data.access_token,
        expiresAt:   Date.now() + (data.expires_in ?? 3600) * 1000,
      });
      return data.access_token;
    } catch {
      return null;
    }
  }

  // â”€â”€ Calendar events â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  async createEvent(
    reservation: Reservation,
    equipamento: Pick<Equipamento, 'nome'>,
  ): Promise<string | null> {
    const token = await this.getValidAccessToken();
    if (!token) return null;

    const event = {
      summary:     `Reserva: ${equipamento.nome}`,
      description: reservation.motivo ?? '',
      start: {
        dateTime: `${reservation.data}T${reservation.horaInicio}:00`,
        timeZone: TZ,
      },
      end: {
        dateTime: `${reservation.data}T${reservation.horaFim}:00`,
        timeZone: TZ,
      },
    };

    try {
      const resp = await fetch(`${CALENDAR_API}/calendars/primary/events`, {
        method:  'POST',
        headers: {
          Authorization:  `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      if (!resp.ok) return null;
      const body = await resp.json();
      return body.id ?? null;
    } catch {
      return null;
    }
  }

  async deleteEvent(eventId: string): Promise<boolean> {
    const token = await this.getValidAccessToken();
    if (!token) return false;

    try {
      const resp = await fetch(`${CALENDAR_API}/calendars/primary/events/${eventId}`, {
        method:  'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      return resp.ok || resp.status === 404;
    } catch {
      return false;
    }
  }

  async updateEvent(
    eventId: string,
    reservation: Reservation,
    equipamento: Pick<Equipamento, 'nome'>,
  ): Promise<boolean> {
    const token = await this.getValidAccessToken();
    if (!token) return false;

    const event = {
      summary:     `Reserva: ${equipamento.nome}`,
      description: reservation.motivo ?? '',
      start: {
        dateTime: `${reservation.data}T${reservation.horaInicio}:00`,
        timeZone: TZ,
      },
      end: {
        dateTime: `${reservation.data}T${reservation.horaFim}:00`,
        timeZone: TZ,
      },
    };

    try {
      const resp = await fetch(`${CALENDAR_API}/calendars/primary/events/${eventId}`, {
        method:  'PUT',
        headers: {
          Authorization:  `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      return resp.ok;
    } catch {
      return false;
    }
  }
}
