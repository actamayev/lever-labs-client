# App Directory

## Purpose
Next.js 15 App Router directory. Contains all routes and page definitions.

## Key Files
| File | Purpose |
|------|---------|
| `layout.tsx` | Root layout with providers, analytics, theme |
| `providers.tsx` | Client-side providers (Google OAuth, Toast) |
| `page.tsx` | Landing page (/) |
| `not-found.tsx` | 404 page |
| `manifest.ts` | PWA manifest |
| `robots.ts` | Robots.txt generation |
| `sitemap.ts` | Sitemap generation |

## Route Structure
| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/login`, `/register`, `/register-google` | Authentication |
| `/career-quest/*` | Educational career activities |
| `/quest/[lessonId]` | Individual lesson pages |
| `/sandbox/[projectUUID]` | Block coding editor |
| `/garage` | Direct robot control |
| `/class-manager/[classCode]` | Teacher classroom management |
| `/scoreboard/[classCode]/[scoreboardId]` | Classroom scoreboards |
| `/whiteboard/[classCode]` | Classroom whiteboard |
| `/arcade/*` | Mini-games (turret, flappy, city-driver) |
| `/settings/*` | User settings (profile, schools) |
| `/contact`, `/privacy`, `/terms`, `/mission`, `/community-guidelines` | Static pages |

## Page Pattern
```typescript
import { createMetadata } from "../src/utils/seo/create-metadata"
import AuthenticatedLayout from "../src/components/layouts/authenticated-layout"
import PageComponent from "../src/page-components/page-name"

export const metadata = createMetadata({
    title: "Page Title",
    description: "Page description",
    path: "/route",
    keywords: ["keyword1", "keyword2"]
})

export default function PageName(): React.ReactNode {
    return (
        <AuthenticatedLayout>
            <PageComponent />
        </AuthenticatedLayout>
    )
}
```

## Dynamic Route Pattern
```typescript
interface PageProps {
    params: Promise<{ paramName: ParamType }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { paramName } = await params
    return createMetadata({ ... })
}

export default async function Page({ params }: PageProps): Promise<React.ReactNode> {
    const { paramName } = await params
    // Validate param, call notFound() if invalid
    return <Component param={paramName} />
}
```

## Conventions
- Page logic lives in `/src/page-components/` or `/src/components/`
- Use `createMetadata()` for SEO metadata
- Use `AuthenticatedLayout` for protected routes
- Dynamic params use `Promise<{}>` pattern (Next.js 15)
- Server Components by default, add `"use client"` only when needed
