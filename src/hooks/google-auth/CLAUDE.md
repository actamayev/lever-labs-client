# Google Auth Hooks

## Purpose
Hooks for Google OAuth authentication flow.

## Files
| File | Purpose |
|------|---------|
| `use-google-auth-callback.ts` | Handles Google OAuth callback and user session setup |

## Key Hook: `useGoogleAuthCallback`
Processes Google OAuth response:
- Calls backend `/google-auth/login-callback` endpoint
- Sets auth state (authenticated, hasCompletedSignup)
- For existing users: populates personal info, teacher data, student classes
- Handles auto-connected pip devices
- Returns `GoogleAuthSuccess` or `null` on failure
