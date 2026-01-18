# Services Directory

## Purpose
Contains data services that handle API communication with the backend. Each service is responsible for a specific domain/feature.

## Architecture
All services extend `BaseDataService` which provides:
- Access to `LeverLabsHttpClient` for HTTP requests
- A `pathHeader` (endpoint prefix like `/auth`, `/garage`)
- A `buildUrl()` helper to construct full endpoint paths

## Pattern
```typescript
import { AxiosResponse } from "axios"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"
import { RequestType, ResponseType } from "@actamayev/lever-labs-common-ts/types/api"
import { BaseDataService } from "./base-data-service"

export default class FeatureDataService extends BaseDataService {
    constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
        super(httpClient, pathHeader)
    }

    async someAction(data: RequestType): Promise<AxiosResponse<ResponseType>> {
        return await this.httpClient.http.post<ResponseType>(
            this.buildUrl("/endpoint"), { data }
        )
    }
}
```

## Key Conventions
- File naming: `{feature}-data-service.ts`
- Class naming: `{Feature}DataService`
- All methods return `Promise<AxiosResponse<T>>`
- Request/response types imported from `@actamayev/lever-labs-common-ts/types/api`
- Services are instantiated in MobX classes, not used directly

## Current Services
| Service | Path Header | Purpose |
|---------|-------------|---------|
| `arcade-data-service.ts` | `/arcade` | Arcade game data |
| `auth-data-service.ts` | `/auth` | Authentication (login, register, OAuth) |
| `career-quest-data-service.ts` | `/career-quest` | Career Quest challenges |
| `chat-data-service.ts` | `/chat` | Chat/messaging |
| `garage-data-service.ts` | `/garage` | Robot garage operations |
| `misc-data-service.ts` | `/misc` | Miscellaneous endpoints |
| `personal-info-data-service.ts` | `/personal-info` | User profile data |
| `pip-data-service.ts` | `/pip` | Pip device management |
| `quest-data-service.ts` | `/quest` | Quest system |
| `sandbox-data-service.ts` | `/sandbox` | Sandbox projects |
| `student-data-service.ts` | `/student` | Student data |
| `teacher-data-service.ts` | `/teacher` | Teacher/classroom data |
| `workbench-data-service.ts` | `/workbench` | Workbench operations |
