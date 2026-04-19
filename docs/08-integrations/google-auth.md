# Google Auth Integration

## 1. Implementation

```typescript
// auth.service.ts
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

async signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  
  return signInWithPopup(this.auth, provider);
}
```
```