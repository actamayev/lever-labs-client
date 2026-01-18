# Page Components Directory

## Purpose
Contains top-level page components that serve as the main content for Next.js routes. These are the "page bodies" that get imported into the App Router `page.tsx` files.

## Pattern
```typescript
"use client"

import { observer } from "mobx-react"  // if using MobX state
import SomeComponent from "../components/feature/some-component"

function PageName(): React.ReactNode {
    return (
        <>
            <Navigation />
            <MainContent />
            <Footer />
        </>
    )
}

export default observer(PageName)  // or just: export default PageName
```

## Key Conventions
- All components are client components (`"use client"`)
- File naming: kebab-case (e.g., `community-guidelines.tsx`)
- Function naming: PascalCase (e.g., `CommunityGuidelines`)
- Wrap with `observer()` if the component reads MobX state
- Compose page from smaller components in `/components/`

## Current Pages
| File | Purpose |
|------|---------|
| `community-guidelines.tsx` | Community guidelines page |
| `contact.tsx` | Contact form page |
| `landing.tsx` | Public landing/marketing page |
| `missing.tsx` | 404 not found page |
| `mission.tsx` | Company mission page |
| `privacy.tsx` | Privacy policy page |
| `terms.tsx` | Terms of service page |

## Relationship to App Router
These components are imported into `src/app/**/page.tsx` files. The App Router handles routing; these components provide the content.
