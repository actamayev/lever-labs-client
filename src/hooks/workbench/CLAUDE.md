# Workbench Hooks

## Purpose
Hooks for workbench/device status display.

## Files
| File | Purpose |
|------|---------|
| `use-get-battery-color-classes.ts` | Returns Tailwind color classes based on battery state |

## Key Hook: `useGetBatteryColorClasses`
Returns color classes for battery indicator:
- `text-charging-green` when charging
- `text-cardinal` (red) at ≤20%
- `text-bee` (yellow) at ≤40%
- `text-fox` (orange) at ≤70%
- `text-macaw` (green) above 70%
- `opacity-50 text-cardinal` when no battery data
