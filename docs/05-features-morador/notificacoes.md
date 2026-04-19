# Notificações

## 1. Objective

Define notification system for resident app.

## 2. Push Notifications

```typescript
// notification.service.ts
@Injectable({ providedIn: 'root' })
export class NotificationService {
  async requestPermission(): Promise<boolean> {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async show(title: string, body: string, data?: any): Promise<void> {
    if (Notification.permission === 'granted') {
      new Notification(title, { body, data });
    }
  }

  subscribeToChannel(channel: string) {
    return this.supabase.channel(channel);
  }
}

// Firebase integration
@Injectable({ providedIn: 'root' })
export class FCMService {
  async getToken(): Promise<string> {
    // Use Firebase Cloud Messaging
    const token = await getToken(this.messaging, {
      vapidKey: environment.fcmVapidKey
    });
    await this.saveToken(token);
    return token;
  }

  private async saveToken(token: string) {
    await this.supabase.from('push_tokens').upsert({
      user_id: this.authService.user.id,
      token,
      platform: 'web'
    });
  }
}
```