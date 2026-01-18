# Career Quest Hooks

## Purpose
Hooks for Career Quest feature functionality including data fetching, navigation, and robot communication triggers.

## Files
| File | Purpose |
|------|---------|
| `use-career-quest-trigger.ts` | Sends enter/exit triggers to robot when entering/leaving career quest pages |
| `use-effect-retrieve-all-careers-challenges.ts` | Fetches all career challenge data |
| `use-effect-retrieve-single-career-challenges.ts` | Fetches challenges for a specific career |
| `use-keyboard-navigation.ts` | Keyboard controls for navigating career quest slides |
| `use-mouse-wheel-navigation.ts` | Mouse wheel controls for slide navigation |

## Key Hook: `useCareerQuestTrigger`
Handles robot communication for career quest pages:
- Sends ENTER trigger on mount (with optional delay)
- Sends EXIT trigger on unmount/page hide/refresh
- Repeats ENTER trigger every 15 seconds while connected
- Handles mid-session pip connections
- Handles React 18 StrictMode double-invoke
