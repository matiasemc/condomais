# Session Management

## 1. Objective

Define session management strategies for CondoMais including persistence, refresh, and security.

## 2. Session Types

### 2.1 Session Durations

| Device Type | Duration | Auto-Logout |
|------------|----------|--------------|
| Remember Me | 30 days | No inactivity timeout |
| Public Device | 30 minutes | 30 min inactive |
| Mobile App | Session + refresh token | 30 min inactive |

### 2.2 Persistence Implementation

```typescript
// session.service.ts
@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly SESSION_KEY = 'condomais_session';
  private readonly REMEMBER_ME_KEY = 'condomais_remember';
  
  async setSession(session: Session, rememberMe: boolean): Promise<void> {
    if (rememberMe) {
      localStorage.setItem(this.REMEMBER_ME_KEY, 'true');
    }
    
    await this.supabase.auth.setSession(session);
  }
  
  async clearSession(): Promise<void> {
    await this.supabase.auth.signOut();
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.REMEMBER_ME_KEY);
  }
  
  isRememberMe(): boolean {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
  }
}
```

---

## 3. Token Refresh Strategy

```typescript
// Refresh tokens before expiry
private setupAutoRefresh(): void {
  interval(60000).pipe(
    filter(() => !!this.authService.getToken()),
    switchMap(() => this.checkTokenExpiry())
  ).subscribe(async (expiring) => {
    if (expiring) {
      await this.supabase.auth.refreshSession();
    }
  });
}
```

---

## 4. Session Security

```typescript
// Detect session changes (logout from another device)
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Force logout everywhere
    this.router.navigate(['/auth/login']);
    this.toast.show('Sessão encerrada');
  }
});
```