# Analytics Hooks

## Purpose
Hooks for analytics and tracking functionality.

## Files
| File | Purpose |
|------|---------|
| `use-initialize-google-analytics.ts` | Initializes Google Analytics and tracks page views on route changes |

## Pattern
- Uses dynamic imports for analytics libraries (only loads in production)
- Tracks `usePathname()` changes for pageview events
- No-op in development environment
