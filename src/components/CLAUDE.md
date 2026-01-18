# Components Directory

## Purpose
Contains all React components organized by feature. Components are functional, use hooks, and integrate with MobX for state management.

## Directory Structure
```
components/
├── [feature]/          # Feature-specific components (garage/, sandbox/, etc.)
├── buttons/            # Reusable button components
├── layouts/            # Layout wrapper components
├── ui/                 # shadcn/ui primitives (don't modify)
├── magicui/            # Magic UI components
├── custom-shadcn-blocks/ # Extended shadcn compositions
└── *.tsx               # Shared utility components
```

## Key Conventions

### File & Component Naming
- Files: kebab-case (e.g., `custom-tooltip.tsx`, `loading-oval.tsx`)
- Components: PascalCase (e.g., `CustomTooltip`, `LoadingOval`)
- One component per file (usually)

### Component Pattern
```typescript
"use client"

import { observer } from "mobx-react"  // if using MobX state
import someClass from "@/classes/some-class"

interface Props {
    someProp: string
}

function MyComponent(props: Props): React.ReactNode {
    const { someProp } = props
    return <div>{someProp}</div>
}

export default observer(MyComponent)  // or just: export default MyComponent
```

### When to Use `observer()`
Wrap with `observer()` when the component reads MobX observable state directly. Skip it for pure presentational components.

## Feature Subdirectories
| Directory | Purpose |
|-----------|---------|
| `arcade/` | Arcade game components |
| `auth/` | Login, register, OAuth components |
| `buttons/` | Reusable button variants |
| `career-quest/` | Career Quest slides and UI |
| `career/` | Career selection components |
| `chat/` | Chat/messaging UI |
| `class-manager/` | Teacher classroom management |
| `classroom/` | Classroom view components |
| `connect-pip/` | Pip connection dialogs |
| `contact/` | Contact form |
| `custom-shadcn-blocks/` | Extended shadcn compositions |
| `footer/` | Site footer |
| `garage/` | Robot control interface |
| `landing/` | Marketing/landing page sections |
| `layouts/` | Page layout wrappers |
| `magicui/` | Magic UI animation components |
| `messages/` | Message display components |
| `profile/` | User profile components |
| `quest/` | Quest question types and UI |
| `sandbox/` | Blockly editor components |
| `school/` | School-related components |
| `scoreboard/` | Leaderboard/scoring |
| `sidebar/` | Navigation sidebar |
| `site-header/` | Top navigation header |
| `social-links/` | Social media links |
| `support/` | Support/help components |
| `theme/` | Theme toggle/provider |
| `ui/` | shadcn/ui primitives (don't modify) |
| `whiteboard/` | Whiteboard feature |
| `whiteboard-page/` | Whiteboard page components |
| `workbench/` | Device workbench UI |

## Shared Components (root level)
| File | Purpose |
|------|---------|
| `character-counter.tsx` | Input character count display |
| `compliance.tsx` | Compliance/legal notices |
| `custom-tooltip.tsx` | Tooltip wrapper component |
| `loading-oval.tsx` | Loading spinner |
| `network-strength-icon.tsx` | WiFi signal indicator |
| `tailwind-indicator.tsx` | Dev breakpoint indicator |

## Important Notes
- **Don't modify `ui/`** - These are shadcn/ui primitives. Extend them in `custom-shadcn-blocks/` instead.
- **Don't modify `magicui/`** - These come from Magic UI library.
- Use Tailwind CSS for styling
- Use Framer Motion for complex animations
