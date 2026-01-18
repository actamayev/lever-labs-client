# Student Hooks

## Purpose
Hooks for student-specific functionality.

## Files
| File | Purpose |
|------|---------|
| `join-hub.ts` | Handles joining a classroom hub via class code |

## Key Hook: `useJoinHub`
Handles the hub joining flow:
- Checks if student already in hub
- Calls `/student/join-hub` endpoint
- Parses slide navigation commands from slideId
- Sets saved position for career quest restoration
- Navigates to the appropriate career quest page
- Shows toast notifications for success/failure
