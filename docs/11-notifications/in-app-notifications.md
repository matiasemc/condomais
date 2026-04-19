# In-App Notifications

```typescript
// notification-center.component.ts
@Component({
  template: `
    <div class="notification-list">
      <div *ngFor="let n of notifications$ | async" 
           class="notification"
           [class.unread]="!n.lida">
        <mat-icon>{{ n.icon }}</mat-icon>
        <div class="content">
          <div class="title">{{ n.titulo }}</div>
          <div class="body">{{ n.corpo }}</div>
          <div class="time">{{ n.created_at | date }}</div>
        </div>
      </div>
    </div>
  `
})
export class NotificationCenterComponent {}
```