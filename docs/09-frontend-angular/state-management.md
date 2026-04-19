# State Management

NgRx for complex state management.

```typescript
// app.state.ts
export interface AppState {
  auth: AuthState;
  deliveries: EntregaState;
  announcements: AvisoState;
  reservas: ReservaState;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
```