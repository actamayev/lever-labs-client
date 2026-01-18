# Garage Hooks

## Purpose
Hooks for robot garage controls including motor driving, LED dots, tones, and actions.

## Files
| File | Purpose |
|------|---------|
| `use-effect-motor-drive.ts` | Keyboard controls for robot driving (WASD/arrows) |
| `use-effect-garage-tones.ts` | Audio tone controls |
| `use-effect-set-dots-colors.ts` | LED dot matrix color controls |
| `use-garage-actions-use-effect.ts` | Horn and headlight actions |

## Key Hook: `useEffectMotorDrive`
Handles keyboard-based robot driving:
- Listens for keydown/keyup events (WASD and arrow keys)
- Skips when typing in inputs or when pip dialog is open
- Computes motor control values via `computeMotorControl()`
- Applies motor control via `applyMotorControl()`
- Clears motor control on unmount
- Responds to throttle percent changes
