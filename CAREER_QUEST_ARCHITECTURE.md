# Career Quest Architecture

## Overview
Career Quest is an educational content delivery system that presents mixed text and challenge content in a 2-column scrollable interface. Users progress through sections linearly, with their progress automatically saved and synced to the backend.

## Core Architecture

### Data Structure Hierarchy

```typescript
CareerQuestData {
  careerUUID: CareerUUID
  careerTitle: string
  initialImage: string (Lucide icon)
  careerColor: DuolingoColors
  sections: CareerSection[]
}

CareerSection = TextParentSection | ChallengeSection

TextParentSection {
  type: "textParent"
  id: string
  children: TextSection[]
}

TextSection {
  type: "text"
  id: string
  content: (() => ReactNode)
  triggerImage: string (Lucide icon)
}

ChallengeSection {
  type: "challenge"
  id: ChallengeUUID
  challengeData: CqChallengeData
}
```

### Main Slide System
The architecture transforms sections into `MainSlide[]` for the main vertical Swiper:

```typescript
MainSlide = TextParentMainSlide | ChallengeMainSlide

TextParentMainSlide {
  type: "textParent"
  id: string
  data: TextParentSection
}

ChallengeMainSlide {
  type: "challenge" 
  id: ChallengeUUID
  data: CqChallengeData
}
```

## UI Layout & Behavior

### Two-Column Interface
- **Left Column (45% width)**: Main content area with vertical scrolling
- **Right Column (55% width)**: Context-sensitive content area

### Left Column Content States
1. **Text Sections**: Displays text content with nested vertical swiping through text children
2. **Challenge Sections**: Shows challenge chat interface for user interaction
3. **Loading State**: Empty placeholder while data loads

### Right Column Content States (`RightContent` type)
1. **Image State**: `{ type: "image", icon: string }` - Shows Lucide icon
2. **Challenge State**: `{ type: "challenge", challengeData: CqChallengeData }` - Shows challenge interface
3. **Career Chat State**: `{ type: "chat" }` - Shows career chat interface

## Navigation System

### Main Navigation (Vertical Swiper)
- Controls progression through main sections (TextParent → Challenge → TextParent...)
- Managed by `CareerQuestClass.swiperInstance`
- Navigation rules:
  - Can always go backward
  - Can only advance if current challenge is completed (for challenge sections)
  - Text sections always allow advancement

### Text Child Navigation (Nested Vertical Swiper)  
- Within TextParent sections, controls progression through individual text children
- Each TextParentSection has its own nested swiper
- Managed by `CareerQuestClass.textParentSwipers` Map

### Right Content Logic
The right column content changes based on complex state logic:

1. **Challenge Sections**: Always show the challenge interface
2. **Text Sections**: 
   - If career chat is toggled: Show career chat
   - If next challenge has been seen: Show that challenge (locked preview)
   - Otherwise: Show the current text child's `triggerImage`

### Career Chat Toggle System
- User can toggle career chat on/off via UI control
- When toggled ON:
  - Stores current right content in `previousRightContent`
  - Sets right content to `{ type: "chat" }`
- When toggled OFF:
  - Restores `previousRightContent`
  - Clears `previousRightContent`
- Challenge sections override chat toggle (challenges always take priority)

## State Management (CareerQuestClass)

### Core State Structure
```typescript
CareerInstance {
  careerDefinition: CareerQuestData
  challenges: Map<string, ChallengeInstance>
  completedChallengeIds: Set<ChallengeUUID>
  currentChallengeUuidOrTextUuid: string
  hasRetrievedAllChallenges: boolean
  
  // Navigation state
  currentMainSlideIndex: number
  currentTextChildIndex: number
  mainSlides: MainSlide[]
  
  // Swiper instances
  swiperInstance: SwiperType | null
  textParentSwipers: Map<string, SwiperType | null>
  
  // UI state
  rightContent: RightContent
  isCareerChatToggled: boolean
  previousRightContent: RightContent | null
  
  // Progress tracking
  savedCurrentPosition: string
  seenChallengeUUIDs: Set<ChallengeUUID>
}
```

### Key State Management Methods
- **Navigation**: `getCurrentMainSlideIndex()`, `getCurrentTextChildIndex()`
- **Swiper Management**: `setSwiperInstance()`, `setTextParentSwiperInstance()`
- **Progress**: `setSavedPosition()`, `markChallengeAsSeen()`
- **Right Content**: `setRightContent()`, `toggleCareerChat()`

## Progress Persistence

### Progress Saving
- Triggered automatically on navigation changes
- Uses `saveCareerProgress(careerUUID, currentId)` utility
- Saves either:
  - Challenge UUID (for challenge sections)
  - Text child ID (for text sections)
- Fire-and-forget API calls (silent failures)

### Progress Restoration
- On page load/navigation, attempts to restore saved position
- Uses `restoreNavigationFromSavedPosition()` method
- Falls back to beginning if saved position not found
- Syncs both main slide index and text child index

## Navigation Controls

### Keyboard Navigation
- Arrow keys control navigation
- Up/Down: Main section navigation
- Left/Right: Text child navigation (when in text sections)

### Mouse Wheel Navigation
- Vertical scrolling controls main section navigation
- Respects slide cooldown period (200ms)

### Programmatic Navigation Methods
- `handleGoToNextMainSection()`
- `handleGoToPreviousMainSection()` 
- `handleGoToNextTextChild()`
- `handleGoToPreviousTextChild()`
- `changeMainSlideToCqChat()` (for direct challenge navigation)

## Data Loading & Initialization

### Initialization Flow
1. `initializeAllCareers()` processes `CAREER_DEFINITIONS`
2. Creates `CareerInstance` with empty challenge data
3. Sets `hasRetrievedAllChallenges: false`
4. Shows loading state in UI

### Data Loading
1. API fetches challenge data asynchronously
2. `setChallengeRetrievedData()` populates challenge instances
3. `setHasRetrievedAllChallengesForCareer(true)` enables full UI
4. `attemptRestoreAndSyncRightContent()` restores saved position

## Challenge Integration

### Challenge State
```typescript
ChallengeInstance {
  challengeData: CqChallengeData
  
  // Chat state
  messages: ChallengeChatMessage[]
  isWaitingForResponse: boolean
  
  // Streaming state
  isStreaming: boolean
  currentStreamingMessageId: string | null
  currentStreamId: string | null
  currentInteractionType: InteractionType | null
  
  // Completion state
  isCompleted: boolean
  blocklyJson: BlocklyJson
  cppCode: string
}
```

### Challenge Chat Features
- Real-time streaming responses
- Hint requests
- Code evaluation
- Progress blocking (must complete to advance)

## Key Files

### Data Layer
- `src/utils/career-quest/career-quest-data.tsx` - Static content definitions
- `src/types/career-quest.ts` - Type definitions
- `src/classes/career-quest-class.ts` - State management

### UI Components
- `src/components/career/lesson-layout/career-layout.tsx` - Main layout component
- `src/components/career/lesson-layout/text-parent-card.tsx` - Text content renderer
- `src/components/career/lesson-layout/right-content.tsx` - Right column content
- `src/components/career/chat/challenge-chat-interface.tsx` - Challenge chat
- `src/components/career/chat/career-chat-interface.tsx` - Career chat

### Navigation & Persistence
- `src/utils/career-quest/save-career-progress.ts` - Progress persistence
- `src/hooks/career-quest/use-keyboard-navigation.ts` - Keyboard controls
- `src/hooks/career-quest/use-mouse-wheel-navigation.ts` - Mouse controls

## Architecture Strengths

1. **Separation of Concerns**: Clear division between data, state, and UI
2. **Flexible Content**: Supports mixed text/challenge content with complex navigation
3. **Progress Persistence**: Automatic save/restore with fallback handling
4. **Complex UI Logic**: Handles intricate right-column state management
5. **Performance**: Lazy loading and efficient swiper management

## Current Limitations

1. **Data Structure Rigidity**: Current section structure is somewhat inflexible
2. **Complex State Logic**: Right content logic has multiple interdependent rules
3. **Navigation Complexity**: Multiple navigation systems can be confusing
4. **Type Safety**: Some areas use loose typing (e.g., icon names as strings)

This architecture successfully handles the complex requirements of mixed educational content with sophisticated navigation and progress tracking.