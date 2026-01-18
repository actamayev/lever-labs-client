# Classes Directory

## Purpose
Contains MobX state management classes that serve as the global state stores for the application. Each class is a singleton instance exported for use throughout the app.

## Architecture
All state classes follow the MobX singleton pattern:
```typescript
"use client"

import { action, makeAutoObservable } from "mobx"

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

## Key Conventions
- File naming: `{feature}-class.ts`
- Class naming: `{Feature}Class`
- Export singleton instance (lowercase): `featureClass`
- Use `makeAutoObservable(this)` in constructor
- Wrap state mutations with `action()`
- Mark as `"use client"` for Next.js

## Core Classes

### API & Networking
| Class | Purpose |
|-------|---------|
| `lever-labs-api-client-class.ts` | Central API client, aggregates all data services |
| `lever-labs-http-client.ts` | Axios HTTP client wrapper |
| `socket-class.ts` | WebSocket connection management |

### Authentication & User
| Class | Purpose |
|-------|---------|
| `auth-class.ts` | Authentication state (login, logout, signup) |
| `personal-info-class.ts` | User profile data |
| `student-class.ts` | Student classroom/hub data |
| `teacher-class.ts` | Teacher/classroom management data |

### Hardware & Serial
| Class | Purpose |
|-------|---------|
| `serial-connection-manager-class.ts` | Web Serial port connections |
| `serial-message-manager-class.ts` | Serial message queue and handling |
| `pip-class.ts` | Pip device state and selection |
| `sensor-data-class.ts` | Robot sensor readings (IMU, distance, etc.) |
| `workbench-class.ts` | Device status (battery, firmware) |

### Features
| Class | Purpose |
|-------|---------|
| `garage-class.ts` | Robot control UI state (driving, lights, display, tones) |
| `career-quest-class.ts` | Career Quest navigation and progress |
| `career-quest-triggers-class.ts` | Career Quest robot trigger management |
| `navigation-manager-class.ts` | Slide navigation and morphing text |
| `quest-class.ts` | Quest question state and answers |
| `sandbox-class.ts` | Blockly sandbox state |
| `arcade-class.ts` | Arcade games state |
| `games-class.ts` | Game-related state |

### Utilities
| Class | Purpose |
|-------|---------|
| `toast-class.tsx` | Toast notification management |
| `chat-manager-class.ts` | Chat/messaging state |
| `utility/sound-manager-class.ts` | Audio playback |

## Usage in Components
```typescript
import { observer } from "mobx-react"
import garageClass from "@/classes/garage-class"

const MyComponent = observer(() => {
    return <div>{garageClass.motorThrottlePercent}%</div>
})
```

## Tests
Unit tests are in `__tests__/` subdirectory for classes with complex logic (career-quest, navigation-manager, student).
