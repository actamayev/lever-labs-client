# Navigate Hooks

## Purpose
Type-safe navigation hooks wrapping Next.js router.

## Files
| File | Purpose |
|------|---------|
| `use-typed-navigate.ts` | Returns a type-safe navigation function using `PageNames` type |

## Usage
```typescript
const navigate = useTypedNavigate()
navigate("/garage") // Type-checked against PageNames
```

## Why This Exists
Provides compile-time route validation using the `PageNames` type instead of raw strings.
