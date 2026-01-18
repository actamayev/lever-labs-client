# Lever Labs Client

Educational robotics platform that enables students to program robots through visual block coding. Built with Next.js 15, React 19, TypeScript, and MobX.

## Overview

Lever Labs is a "Duolingo for Robotics" platform where students learn programming concepts through interactive lessons and hands-on robot control. The platform connects to physical robots via Web Serial API, allowing users to write visual block code that compiles to C++ and runs on hardware.

### Key Features

- **Career Quest** - Progressive coding challenges with gamified learning
- **Sandbox** - Visual block programming environment (Google Blockly)
- **Garage** - Direct robot control interface for testing
- **Classroom Management** - Teacher dashboards and student tracking
- **Hardware Integration** - Real-time robot communication via Web Serial API

### User Types

| Role | Capabilities |
|------|--------------|
| Student | Complete lessons, write block code, control robots, join classrooms |
| Teacher | Create classrooms, manage students, track progress, control scoreboards |

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS, Radix UI, shadcn/ui |
| State | MobX (singleton pattern) |
| Forms | react-hook-form + Zod |
| Block Coding | Google Blockly |
| Hardware | Web Serial API |
| Auth | Google OAuth |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Chrome/Edge browser (Web Serial API support required)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd lever-labs-client

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values
```

### Environment Variables

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=     # Google OAuth client ID
NEXT_PUBLIC_API_URL=              # Backend API base URL
NEXT_PUBLIC_GA_MEASUREMENT_ID=    # Google Analytics (optional)
```

### Development

```bash
# Start development server (uses sudo for serial port access)
pnpm run dev

# Type checking
pnpm run type-check

# Linting
pnpm run lint
pnpm run lint:fix

# Production build
pnpm run build

# Bundle analysis
pnpm run analyze
```

## Architecture

```
├── app/                    # Next.js App Router (routes & pages)
├── src/
│   ├── classes/            # MobX state management (singletons)
│   ├── components/         # React components organized by feature
│   │   ├── shadcn/ui/      # shadcn/ui components (generated)
│   │   ├── magicui/        # Magic UI animations (generated)
│   │   └── [features]/     # Feature-specific components
│   ├── hooks/              # Custom React hooks by feature
│   ├── lib/                # Server-side utilities
│   ├── page-components/    # Page body components
│   ├── services/           # API data services
│   ├── styles/             # Global CSS and color variables
│   ├── types/              # Global TypeScript declarations
│   └── utils/              # Utility functions by feature
└── public/                 # Static assets
```

### Core Patterns

**MobX State Management** - Singleton classes with `makeAutoObservable`:
```typescript
class FeatureClass {
    constructor() { makeAutoObservable(this) }
}
const featureClass = new FeatureClass()
export default featureClass
```

**API Services** - Extend `BaseDataService` with typed endpoints:
```typescript
class FeatureDataService extends BaseDataService {
    constructor() { super("/api/feature") }
}
```

**Components** - Functional components with `observer()` for MobX reactivity:
```typescript
const Component = observer(() => <div>{featureClass.state}</div>)
```

### Hardware Communication

Robot communication flows through:
1. `SerialConnectionManagerClass` - Port lifecycle management
2. `SerialMessageManagerClass` - Send/receive message handling
3. `src/utils/garage/*` - High-level control utilities (drive, lights, tones)
4. `src/utils/cpp/cpp-generator.ts` - Blockly → C++ code generation

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/login`, `/register` | Authentication |
| `/career-quest/*` | Educational lessons |
| `/sandbox/[projectUUID]` | Block coding editor |
| `/garage` | Robot control |
| `/quest/[lessonId]` | Individual lessons |
| `/class-manager/[classCode]` | Teacher dashboard |
| `/scoreboard/[classCode]/*` | Classroom scoreboards |

## Browser Requirements

This application requires **Web Serial API** support:
- Chrome 89+
- Edge 89+
- Opera 75+

Safari and Firefox are not supported due to lack of Web Serial API.

## License

MIT License - see [LICENSE](LICENSE) for details.
