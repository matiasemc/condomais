# Push Notifications

Firebase Cloud Messaging integration.

```typescript
// fcm.service.ts
import { getToken, onMessage } from 'firebase/messaging';

async function setupPushNotifications() {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  const token = await getToken(messaging, { vapidKey });
  
  // Save token to backend
  await supabase.from('push_tokens').upsert({
    user_id: currentUser.id,
    token,
    platform: 'web'
  });
}
```