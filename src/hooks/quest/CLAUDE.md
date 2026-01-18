# Quest Hooks

## Purpose
Keyboard handlers for various quest question types. Each question type has a keyboard handler (for answering) and an escape handler (for navigation/cancellation).

## Files
| File | Purpose |
|------|---------|
| `use-action-to-code-multiple-choice-escape-handler.ts` | Escape key handling for action-to-code questions |
| `use-action-to-code-multiple-choice-keyboard-handler.ts` | Number key selection for action-to-code questions |
| `use-block-to-function-escape-handler.ts` | Escape key handling for block-to-function questions |
| `use-block-to-function-keyboard-handler.ts` | Number keys 1-3 to select answers |
| `use-function-to-block-escape-handler.ts` | Escape key handling for function-to-block questions |
| `use-function-to-block-keyboard-handler.ts` | Number key selection for function-to-block questions |
| `use-matching-question-escape-handler.ts` | Escape key handling for matching questions |
| `use-matching-question-keyboard-handler.ts` | Keyboard controls for matching questions |
| `use-press-enter-question-keyboard-handler.ts` | Enter key to proceed |

## Pattern
- Check if current question type matches before handling
- Skip when OTP input is focused (`isOtpInputFocused()`)
- Skip during confirmation stage
- Use `questClass` for state management
