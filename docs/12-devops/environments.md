# Environments

## 1. Environment List

| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | dev.condomais.app | Feature development |
| Staging | staging.condomais.app | Integration testing |
| Production | app.condomais.app | Live environment |

## 2. Environment Configuration

```typescript
// environments/environment.ts
export const environment = {
  production: false,
  supabaseUrl: 'https://dev-xxx.supabase.co',
  supabaseAnonKey: 'xxx',
  apiUrl: 'https://dev-api.condomais.app'
};
```