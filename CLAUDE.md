# Lever Lab Client - CLAUDE.md

## Project Overview
Educational robotics platform built with Next.js 15, React, TypeScript, and MobX. Enables students to program robots through visual block coding and interact with hardware via Web Serial API. The platform serves two primary user types: **students** learning robotics through gamified lessons and **teachers** managing classrooms.

## Tech Stack
| Category | Technology |
|----------|------------|
| Framework | Next.js 15 with App Router |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + CSS custom properties |
| State Management | MobX (singleton pattern) |
| UI Components | Radix UI + shadcn/ui |
| Forms | react-hook-form + Zod validation |
| Block Coding | Google Blockly |
| Hardware | Web Serial API |
| Auth | Google OAuth + custom JWT |
| Analytics | Google Analytics + Vercel Analytics |

## Directory Structure

```
├── app/                    # Next.js App Router (routes)
├── src/
│   ├── classes/            # MobX state management (singletons)
│   ├── components/         # React components by feature
│   │   ├── shadcn/ui/      # shadcn/ui (DO NOT MODIFY)
│   │   ├── magicui/        # Magic UI animations (DO NOT MODIFY)
│   │   └── [features]/     # Feature-specific components
│   ├── hooks/              # Custom React hooks by feature
│   ├── lib/                # Server-side utilities
│   ├── page-components/    # Page body components
│   ├── services/           # API data services (BaseDataService)
│   ├── styles/             # Global CSS and color variables
│   ├── types/              # Global TypeScript declarations
│   └── utils/              # Utility functions by feature
└── public/                 # Static assets
```

### Directory Documentation
Each major directory contains a `CLAUDE.md` file with detailed documentation:
- `app/CLAUDE.md` - Route structure and page patterns
- `src/classes/CLAUDE.md` - MobX singleton pattern
- `src/components/CLAUDE.md` - Component organization
- `src/hooks/*/CLAUDE.md` - Hook categories (analytics, garage, navigate, etc.)
- `src/page-components/CLAUDE.md` - Page body pattern
- `src/services/CLAUDE.md` - BaseDataService architecture
- `src/types/CLAUDE.md` - Global type declarations
- `src/utils/*/CLAUDE.md` - Utility categories (blockly, career-quest, garage, etc.)

## Code Conventions

### File Naming
| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `career-quest.tsx` |
| MobX Classes | kebab-case + `-class` | `auth-class.ts` |
| Hooks | kebab-case + `use-` | `use-typed-navigate.ts` |
| Utils/Services | kebab-case | `pip-data-service.ts` |
| Types | kebab-case | `serial-types.ts` |

### Import Order
```typescript
// 1. External libraries
import { observer } from "mobx-react"
import { useState } from "react"

// 2. Common package types
import { CareerUUID } from "@actamayev/lever-labs-common-ts/types/utils"

// 3. Internal components (use @/ alias)
import { Button } from "@/components/shadcn/ui/button"

// 4. Classes, services, utils
import authClass from "@/classes/auth-class"
import { careerQuestDataService } from "@/services/career-quest-data-service"
```

## Core Patterns

### MobX State Management
```typescript
// src/classes/feature-class.ts
import { makeAutoObservable, action } from "mobx"

class FeatureClass {
    public someState: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    public setSomeState = action((value: string): void => {
        this.someState = value
    })
}

const featureClass = new FeatureClass()
export default featureClass
```

### React Component with MobX
```typescript
"use client"
import { observer } from "mobx-react"
import featureClass from "@/classes/feature-class"

const MyComponent = observer((): React.ReactNode => {
    // Access MobX state directly - component re-renders on changes
    return <div>{featureClass.someState}</div>
})

export default MyComponent
```

### API Service Pattern
```typescript
// src/services/feature-data-service.ts
import BaseDataService from "./base-data-service"

class FeatureDataService extends BaseDataService {
    constructor() {
        super("/api/feature") // Base path
    }

    async getData(): Promise<AxiosResponse<ResponseType>> {
        return await this.httpClient.http.get<ResponseType>(
            this.buildUrl("/endpoint")
        )
    }
}

export const featureDataService = new FeatureDataService()
```

### Next.js Page Pattern
```typescript
// app/feature/page.tsx
import { createMetadata } from "@/utils/seo/create-metadata"
import AuthenticatedLayout from "@/components/layouts/authenticated-layout"
import FeaturePage from "@/page-components/feature"

export const metadata = createMetadata({
    title: "Feature",
    description: "Feature description",
    path: "/feature",
    keywords: ["keyword1", "keyword2"]
})

export default function Feature(): React.ReactNode {
    return (
        <AuthenticatedLayout>
            <FeaturePage />
        </AuthenticatedLayout>
    )
}
```

### Global Type Declaration
```typescript
// src/types/feature.ts
declare global {
    type FeatureType = "value1" | "value2"
    interface FeatureData {
        id: string
        name: string
    }
}
export {}
```

## Key Features & Architecture

### Career Quest
Educational coding challenges with progressive difficulty.
- Routes: `/career-quest/*` (driving-school, meet-pip, obstacle-avoidance)
- Data: `src/utils/career-quest/` (left/right content definitions)
- Components: `src/components/career/`

### Sandbox (Block Coding)
Visual programming environment using Google Blockly.
- Route: `/sandbox/[projectUUID]`
- Blockly config: `src/utils/blockly/` (categories, custom-blocks, toolbox)
- Code generation: `src/utils/cpp/cpp-generator.ts` (blocks → C++ for robot)

### Garage (Robot Control)
Direct hardware control interface.
- Route: `/garage`
- Serial communication: `src/classes/serial-connection-manager-class.ts`
- Control utils: `src/utils/garage/` (driving, lights, tones, sensors)

### Classroom Management
Teacher/student classroom system.
- Teacher routes: `/class-manager/[classCode]`
- Student routes: `/scoreboard/[classCode]`, `/whiteboard/[classCode]`
- Teacher utils: `src/utils/teacher/` (hub, scoreboard management)
- Student utils: `src/utils/student/`

### Hardware Integration
Robot communication via Web Serial API.
- Connection: `SerialConnectionManagerClass` manages port lifecycle
- Messaging: `SerialMessageManagerClass` handles send/receive
- Protocol: Custom packet format with checksums
- Commands: Drive, lights, tones, sensors, firmware updates

## Styling

### Tailwind + Custom Properties
```typescript
// Use Tailwind utilities
<div className="flex items-center gap-4 p-4">

// Colors defined in src/styles/colors.css
<div className="bg-primary text-primary-foreground">

// Responsive (mobile-first)
<div className="w-full md:w-1/2 lg:w-1/3">
```

### shadcn/ui Components
Located in `src/components/shadcn/ui/`. **Do not modify directly** - extend with variants:
```typescript
import { Button } from "@/components/shadcn/ui/button"
import { cva } from "class-variance-authority"

const customVariants = cva("base-classes", {
    variants: { size: { sm: "...", lg: "..." } }
})
```

## Development

### Commands
```bash
pnpm run dev --turbo    # Dev server with Turbo
pnpm run build          # Production build
pnpm run type-check     # TypeScript validation
pnpm run analyze        # Bundle analysis
```

### Environment Variables
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Google OAuth
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics

## Important Rules

1. **No automated testing** - This project doesn't use tests
2. **MobX singletons** - Always use singleton pattern for classes
3. **Don't modify shadcn/ui** - Components in `src/components/shadcn/ui/` are generated
4. **Don't modify magicui** - Components in `src/components/magicui/` are generated
5. **Use established serial utils** - Don't write raw serial commands; use `src/utils/garage/`
6. **Common package** - Shared types come from `@actamayev/lever-labs-common-ts`
7. **Server Components default** - Only add `"use client"` when needed (hooks, MobX, browser APIs)

## ESLint Rules
- Filenames must match directory structure
- Max line length enforced
- TypeScript naming conventions required
- React hooks rules enforced
- No unused variables/imports
