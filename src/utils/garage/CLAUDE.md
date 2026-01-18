# Garage Utils

## Purpose
Utilities for robot garage controls including driving, lights, display, and audio.

## Files
| File | Purpose |
|------|---------|
| `apply-motor-control.ts` | Apply motor control values, emit via socket |
| `compute-motor-control.ts` | Compute motor values from pressed keys |
| `create-display-message.ts` | Create display message from pixel buffer |
| `garage-actions.ts` | Horn and headlight actions |
| `lights-animation.ts` | LED light animation utilities |
| `play-fun-tone.ts` | Play tones on the robot |

## Key Function: `applyMotorControl`
- Maps motor control to drive directions
- Updates GarageClass state
- Emits motor control via WebSocket to connected pip
- Handles connection state validation
