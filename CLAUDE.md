# Lever Lab Client - CLAUDE.md

## Project Overview
Educational robotics platform built with Next.js 15, React, TypeScript, and MobX. Enables students to program robots through visual block coding and interact with hardware via Web Serial API.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 
- **Styling**: Tailwind CSS
- **State Management**: MobX
- **UI Components**: Radix UI + shadcn/ui
- **Block Coding**: Blockly
- **Hardware**: Web Serial API for robot communication

## Code Conventions

### File Naming & Organization
- **Components**: kebab-case (e.g., `career-quest.tsx`, `create-metadata.ts`)
- **Classes**: kebab-case with `-class` suffix (e.g., `auth-class.ts`, `garage-class.ts`) 
- **Utils/Services**: kebab-case (e.g., `career-quest-data.tsx`, `pip-data-service.ts`)
- **Hooks**: camelCase with `use-` prefix (e.g., `use-typed-navigate.ts`)

### Directory Structure
```
src/
├── classes/           # MobX state management classes
├── components/        # React components organized by feature
│   ├── shadcn/       # shadcn/ui components (don't modify)
│   └── [features]/   # Feature-specific components
├── hooks/            # Custom React hooks
├── services/         # API data services  
├── utils/            # Utility functions organized by feature
└── types/            # TypeScript type definitions
```

### Component Patterns
- Use **functional components** with hooks
- **MobX**: Import classes from `/src/classes/` and use `observer()` wrapper
- **Forms**: Use `react-hook-form` with Zod validation
- **UI**: Prefer shadcn/ui components, extend with custom variants using `class-variance-authority`

### State Management
- **Global state**: MobX classes in `/src/classes/` (singleton pattern)
- **Component state**: React hooks
- **Forms**: react-hook-form
- **Server state**: Direct API calls via services (no React Query)

### Import Organization
```typescript
// External libraries
import { observer } from "mobx-react"
import { useState } from "react"

// Internal utilities & types
import { CareerUUID } from "@lever-labs/common-ts/types/utils" 
import { Button } from "@/components/shadcn/ui/button"

// Classes & services  
import { AuthClass } from "@/classes/auth-class"
import { careerQuestDataService } from "@/services/career-quest-data-service"
```

### Styling Patterns
- **Tailwind CSS**: Use utility classes
- **Colors**: Use CSS custom properties from `/src/styles/colors.css`
- **Responsive**: Mobile-first approach
- **Animations**: Framer Motion for complex animations

### Hardware Integration
- **Serial Communication**: Use `SerialConnectionManagerClass` and `SerialMessageManagerClass`
- **Robot Control**: Commands sent via `/src/utils/garage/` utilities
- **Blockly**: Code generation handled in `/src/utils/blockly/`

## Development Commands
```bash
# Development
pnpm run dev --turbo    # Start dev server with Turbo

# Code Quality  
pnpm run type-check     # TypeScript check

# Build
pnpm run build          # Production build
pnpm run analyze        # Bundle analysis
```

## Key Features
- **Career Quest**: Educational coding challenges
- **Sandbox**: Visual block programming environment  
- **Garage**: Direct robot control interface
- **Classroom Management**: Teacher/student functionality
- **Hardware Integration**: Web Serial API robot communication

## Important Notes
- **No Testing**: This project doesn't use automated testing
- **MobX Classes**: Follow singleton pattern in `/src/classes/`
- **Serial Safety**: Hardware communication is handled through established utility functions
- **shadcn/ui**: Don't modify components in `/src/components/shadcn/ui/` - extend them instead
- **Common Package**: Shared types/constants come from `@lever-labs/common-ts`

## ESLint Rules
- Filenames must match their directory structure
- Max line length enforced
- TypeScript naming conventions required
- React hooks rules enforced
