# Authentication Flow

## 1. Objective

Define the complete authentication flow for CondoMais, including Google OAuth 2.0, magic links, and session management.

## 2. Scope

- Google OAuth 2.0 integration
- Email/password fallback
- Magic link authentication
- JWT token management
- Session persistence

---

## 3. Authentication Methods

### 3.1 Google OAuth 2.0 (Primary)

```typescript
// auth.service.ts
import { signInWithPopup, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

async signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  
  // Use popup for web, redirect for mobile
  if (this.platform.isMobile) {
    return signInWithRedirect(this.auth, provider);
  }
  
  return signInWithPopup(this.auth, provider);
}

// Handle OAuth callback
async handleOAuthCallback(): Promise<boolean> {
  const { user } = await getRedirectResult(this.auth);
  
  if (user) {
    // Link or create usuario record
    await this.linkUsuarioRecord(user);
    return true;
  }
  
  return false;
}

// Link Google user to existing account
async linkGoogleAccount(googleUser: User): Promise<void> {
  // Update usuario with google_id
  await this.supabase
    .from('usuarios')
    .update({
      google_id: googleUser.uid,
      google_avatar: googleUser.photoURL
    })
    .eq('auth_id', this.auth.currentUser.uid);
}
```

### 3.2 Email/Password Flow

```typescript
// Register with email/password
async registerWithEmail(email: string, password: string): Promise<UserCredential> {
  // Create auth user
  const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
  
  // Send verification email
  await sendEmailVerification(this.auth.currentUser);
  
  return { user };
}

// Sign in with email/password
async signInWithEmail(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(this.auth, email, password);
}
```

### 3.3 Magic Link Flow

```typescript
// Send magic link
async sendMagicLink(email: string): Promise<void> {
  const actionCodeSettings = {
    url: `${window.location.origin}/auth/verify?email=${email}`,
    handleCodeInApp: true
  };
  
  await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
  
  // Store email for verification
  sessionStorage.setItem('emailForSignIn', email);
}

// Verify magic link
async verifyMagicLink(): Promise<boolean> {
  const email = sessionStorage.getItem('emailForSignIn');
  
  if (isSignInWithEmailLink(this.auth, window.location.href)) {
    const result = await signInWithEmailLink(this.auth, email);
    return !!result.user;
  }
  
  return false;
}
```

---

## 4. Token Flow

### 4.1 JWT Token Creation

Supabase Auth automatically creates JWT on login:

```typescript
// Token structure (auto-created by Supabase)
interface JWTPayload {
  sub: string;       // auth.users.id
  email: string;
  email_verified: boolean;
  iss: string;     // "https://[project].supabase.co"
  iat: number;
  exp: number;
  role: string;    // "authenticated"
  aat: number;   // access token issued at
  
  // Custom claims (set via trigger)
  condominio_id: string;
  role: string;
  permissions: string[];
}
```

### 4.2 Custom Claims Setter

```sql
-- Function to set custom claims
CREATE OR REPLACE FUNCTION set_user_claims()
RETURNS TRIGGER AS $$
BEGIN
  -- This is called via auth.users trigger
  -- Claims are automatically available in JWT
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 4.3 Token Refresh

```typescript
// Auto-refresh token
const { data: { session } } = await supabase.auth.getSession();

// Manual refresh
const { data, error } = await supabase.auth.refreshSession();
```

---

## 5. Login Flow Diagram

```
┌─────────────┐
│  App Open   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Check     │── Has valid session? ──▶ [Dashboard]
│  Session   │
└──────┬─────┘
       │ No
       ▼
┌─────────────┐
│  Login     │
│  Screen    │
└──────┬─────┘
       │
  ┌────┼──────────────┐
  ▼   ▼            ▼
Google  Email/Pass   Magic Link
  │   │            │
  ▼   ▼            ▼
OAuth  Register   Send Link
  │   │            │
  │   ▼            ▼
  │ Email      Email with
  │ Verify    Link
  │            │
  ▼            ▼
[Verify + Create User]
         │
         ▼
  [Dashboard]
```

---

## 6. Error Handling

```typescript
// Auth errors map
const AUTH_ERRORS: Record<string, string> = {
  'auth/invalid-email': 'Email inválido',
  'auth/user-disabled': 'Usuário desativado',
  'auth/user-not-found': 'Usuário não encontrado',
  'auth/wrong-password': 'Senha incorreta',
  'auth/email-already-in-use': 'Email já cadastrado',
  'auth/weak-password': 'Senha muito fraca',
  'auth/popup-closed-by-user': 'Login cancelado'
};
```

---

## 7. Security Requirements

- Password minimum 8 characters, 1 uppercase, 1 number
- Account lockout after 5 failed attempts (15 min)
- Session expires after 30 days (remember me)
- Session expires after 30 minutes (public device)
- 2FA recommended for Síndico role