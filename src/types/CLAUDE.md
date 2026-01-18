# Types Directory

## Purpose
Contains TypeScript type definitions used throughout the application. Types are declared globally using `declare global {}` blocks.

## File Organization
- **Feature-specific types**: Named after their feature (e.g., `garage.ts`, `blockly.ts`, `sandbox.ts`)
- **Shared utilities**: `utils.ts` for cross-cutting types
- **Hardware types**: `serial-types.ts` for Web Serial API interfaces

## Pattern
All type files follow this structure:
```typescript
// Optional imports from external packages
import { SomeType } from "@actamayev/lever-labs-common-ts/types/..."

declare global {
    // Type definitions here
    type MyType = "value1" | "value2"

    interface MyInterface {
        field: string
    }
}

export {}
```

## Key Conventions
- Use `declare global {}` to make types available without imports
- End each file with `export {}` to make it a module
- Prefer `type` for unions/aliases, `interface` for object shapes
- Import shared types from `@actamayev/lever-labs-common-ts` when available

## Current Files
| File | Purpose |
|------|---------|
| `arcade.ts` | Arcade game types |
| `blockly.ts` | Blockly editor and custom block types |
| `career-quest.ts` | Career Quest challenge types |
| `garage.ts` | Robot control and motor types |
| `learn.ts` | Learning module types |
| `pip.ts` | Pip device connection types |
| `routes.ts` | Route/navigation types |
| `sandbox.ts` | Sandbox editor types |
| `serial-types.ts` | Web Serial API interfaces |
| `student.ts` | Student data types |
| `utils.ts` | Shared utility types (auth, colors, sidebar) |
