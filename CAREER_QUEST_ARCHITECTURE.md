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
  children: (TextSection | MorphingTextSection)[]
  transition?: TextTransition (optional fade transition)
}

TextTransition {
  duration: number (milliseconds for fade effect)
}

TextSection {
  type: "text"
  id: string
  content: (() => ReactNode)
  rightSideContent: string (Lucide icon)
  triggerFunction?: (() => Promise<void>) (optional async function)
}

MorphingTextSection {
  type: "morphingText"
  id: string
  staticText: string
  morphingVariants: MorphingVariant[]
}

MorphingVariant {
  text: string
  rightContent: RightContent
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
1. **Text Sections**: Displays static text content with nested vertical swiping through text children
2. **Morphing Text Sections**: Dynamic text that transitions between variants with animations
3. **Challenge Sections**: Shows challenge chat interface for user interaction
4. **Loading State**: Empty placeholder while data loads
5. **Transition State**: Black overlay during fade transitions between main sections

### Right Column Content States (`RightContent` type)
1. **Image State**: `{ type: "image", icon: string }` - Shows Lucide icon
2. **Challenge State**: `{ type: "challenge", challengeData: CqChallengeData }` - Shows challenge interface
3. **Career Chat State**: `{ type: "chat" }` - Shows career chat interface

## Navigation System

### Main Navigation (Vertical Swiper)
- Controls progression through main sections (TextParent → Challenge → TextParent...)
- Managed by `NavigationManagerClass.swiperInstance`
- Navigation rules:
  - Can always go backward
  - Can only advance if current challenge is completed (for challenge sections)
  - Text sections always allow advancement

### Text Child Navigation (Nested Vertical Swiper)  
- Within TextParent sections, controls progression through individual text children
- Each TextParentSection has its own nested swiper
- Managed by `NavigationManagerClass.textParentSwipers` Map
- Supports both regular text slides and morphing text slides

### Morphing Text Navigation
- Allows navigation through text variants within a single morphing section
- Controlled by `NavigationManagerClass.morphingTextIndices` Map storing current variant index per morphing section
- Animation states tracked in `NavigationManagerClass.morphingAnimationStates` Map to prevent navigation during transitions
- Methods: `NavigationManagerClass.advanceMorphingText()`, `goBackMorphingText()`, `canAdvanceMorphingText()`

### Transition System
- **Fade Transitions**: Smooth black overlay transitions between main sections
- **Duration Control**: Configurable transition duration per section (default 1000ms)
- **Two-Phase Process**: 
  1. Fade out (overlay appears) - duration/2
  2. Instant slide change + brief pause
  3. Fade in (overlay disappears) - duration/2
- **State Management**: `isTransitioning` flag prevents input during transitions

### Right Content Logic
The right column content changes based on complex state logic:

1. **Challenge Sections**: Always show the challenge interface
2. **Text Sections**: 
   - If career chat is toggled: Show career chat
   - If next challenge has been seen: Show that challenge (locked preview)
   - For morphing text: Show the current variant's `rightContent`
   - For regular text: Show the text child's `rightSideContent`

### Career Chat Toggle System
- User can toggle career chat on/off via UI control
- When toggled ON:
  - Stores current right content in `previousRightContent`
  - Sets right content to `{ type: "chat" }`
- When toggled OFF:
  - Restores `previousRightContent`
  - Clears `previousRightContent`
- Challenge sections override chat toggle (challenges always take priority)

## State Management Architecture

The state management has been refactored from a monolithic `CareerQuestClass` into three focused manager classes that work together:

### CareerQuestClass (Main Coordinator)
Manages career lifecycle, progress tracking, and UI state coordination.

```typescript
CareerInstance {
  careerDefinition: CareerQuestData
  completedChallengeIds: Set<ChallengeUUID>
  currentChallengeUuidOrTextUuid: string
  hasRetrievedAllChallenges: boolean
  isRetrievingData: boolean
  savedCurrentPosition: string
  furthestSeenChallengeUuidOrTextUuid: string
  seenChallengeUUIDs: Set<ChallengeUUID>
  rightContent: RightContent
  isCareerChatToggled: boolean
  previousRightContent: RightContent | null
}
```

**Key Methods:**
- **Progress**: `setSavedPosition()`, `markChallengeAsSeen()`, `setFurthestSeenPosition()`
- **Button Interactions**: `handleButtonClickAdvance()`, `canAdvancePastTextChild()`
- **Right Content**: `setRightContent()`, `toggleCareerChat()`, `updateRightContentForCurrentState()`
- **Data Management**: `setChallengeRetrievedData()`, `updateBlocklyJson()`

### ChatManagerClass (Chat State Manager)
Manages all challenge and career chat functionality, streaming, and messaging.

```typescript
ChallengeInstance {
  challengeData: CqChallengeData
  messages: ChallengeChatMessage[]
  isWaitingForResponse: boolean
  isStreaming: boolean
  currentStreamingMessageId: string | null
  currentStreamId: string | null
  currentInteractionType: InteractionType | null
  isWaitingForCodeCheck: boolean
  isCompleted: boolean
  blocklyJson: BlocklyJson
  cppCode: string
}

CareerChatData {
  messages: CareerChatMessage[]
  isWaitingForResponse: boolean
  isStreaming: boolean
  currentStreamingMessageId: string | null
  currentStreamId: string | null
  currentInteractionType: InteractionType | null
  isWaitingForCodeCheck: boolean
}
```

**Key Methods:**
- **Challenge Chat**: `addChallengeUserMessage()`, `addChallengeHintRequestMessage()`
- **Career Chat**: `addCareerUserMessage()`, `clearCareerChatMessages()`
- **Streaming**: `startChallengeStreaming()`, `addChallengeStreamingChunk()`
- **Code Management**: `updateBlocklyJson()`, `getCppCode()`

### NavigationManagerClass (Navigation State Manager)
Handles all navigation state, swiper instances, and morphing text management.

```typescript
CareerNavigationInstance {
  careerUUID: CareerUUID
  // Navigation state
  currentMainSlideIndex: number
  textChildIndices: Map<string, number>
  morphingTextIndices: Map<string, number>
  morphingAnimationStates: Map<string, boolean>
  mainSlides: MainSlide[]
  // Swiper state
  swiperInstance: SwiperType | null
  textParentSwipers: Map<string, SwiperType | null>
  // Transition state
  isTransitioning: boolean
  currentTransitionDuration: number
  lastSlideChangeTime: number
}
```

**Key Methods:**
- **Navigation**: `getCurrentMainSlideIndex()`, `getCurrentTextChildIndex()`
- **Morphing Text**: `setMorphingIndex()`, `advanceMorphingText()`, `canAdvanceMorphingText()`
- **Swiper Management**: `setSwiperInstance()`, `setTextParentSwiperInstance()`
- **Transitions**: `setIsTransitioning()`, `handleMainSlideTransitionNavigation()`
- **Position Management**: `findPositionIndices()`, `navigateToPosition()`

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
- `handleGoToNextMainSection()` - Advances to next main section (with transition support)
- `handleGoToPreviousMainSection()` - Goes back to previous main section (with transition support)
- `handleGoToNextTextChild()` - Advances within text parent sections
- `handleGoToPreviousTextChild()` - Goes back within text parent sections
- `changeMainSlideToCqChat()` - Direct navigation to specific challenge
- `advanceMorphingText()` / `goBackMorphingText()` - Navigate morphing text variants

### Button Interaction System
- **Purpose**: Prevents automatic progression past certain text children that require user interaction
- **Implementation**: Text children with interactive elements (e.g., "YES" buttons) block navigation
- **Progress Tracking**: Uses `furthestSeenChallengeUuidOrTextUuid` to track highest reached position
- **Button Advancement**: `handleButtonClickAdvance()` allows progression when button is clicked
- **Validation**: `canAdvancePastTextChild()` checks if user can advance past interactive content
- **Known Interactive Elements**: Currently tracks text children with specific IDs (e.g., "meet-pip-1-6")

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

### Challenge Integration with ChatManagerClass
Challenge state is now managed by `ChatManagerClass` with the following structure:

```typescript
ChallengeInstance {
  challengeData: CqChallengeData
  messages: ChallengeChatMessage[]
  isWaitingForResponse: boolean
  isStreaming: boolean
  currentStreamingMessageId: string | null
  currentStreamId: string | null
  currentInteractionType: InteractionType | null
  isWaitingForCodeCheck: boolean
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
- `src/classes/career-quest-class.ts` - Main coordinator and progress management
- `src/classes/chat-manager-class.ts` - Chat and messaging state management  
- `src/classes/navigation-manager-class.ts` - Navigation and swiper state management

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

## Morphing Text System

### Purpose
Morphing text sections provide dynamic content that changes through multiple variants within a single text child, allowing for progressive revelation or contextual content updates.

### Implementation Details
- **Static Base**: Each morphing section has static text that remains constant
- **Variants**: Array of text variants, each with its own `rightContent`
- **Index Tracking**: Current variant stored per morphing section ID in `morphingTextIndices` Map
- **Animation Prevention**: `morphingAnimationStates` Map prevents navigation during transitions
- **Right Content Sync**: Right column updates automatically when morphing variants change

### Navigation Methods
- `advanceMorphingText()` - Move to next variant
- `goBackMorphingText()` - Move to previous variant  
- `canAdvanceMorphingText()` / `canGoBackMorphingText()` - Navigation validation
- `setMorphingAnimationState()` - Control animation blocking
- `isAnyMorphingTextAnimating()` - Check if any morphing is in progress

### Use Cases
- Progressive content revelation (e.g., step-by-step instructions)
- Context-sensitive content (e.g., responses to user actions)
- Interactive storytelling with multiple paths
- Dynamic right-column content coordination

## Architecture Strengths

1. **Separation of Concerns**: Clear division between data, state, and UI
2. **Flexible Content**: Supports mixed text/challenge content with complex navigation
3. **Dynamic Text System**: Morphing text sections with variant-based content changes
4. **Smooth Transitions**: Configurable fade effects between major sections
5. **Progress Persistence**: Automatic save/restore with fallback handling and furthest-seen tracking
6. **Interactive Controls**: Button-based progression with validation logic
7. **Complex UI Logic**: Handles intricate right-column state management with chat toggling
8. **Performance**: Lazy loading, efficient swiper management, and animation state control

## Current Limitations

1. **Data Structure Rigidity**: Current section structure is somewhat inflexible
2. **Complex State Logic**: Right content logic has multiple interdependent rules, especially with chat toggling
3. **Navigation Complexity**: Multiple navigation systems (main, text child, morphing text) can be confusing
4. **Type Safety**: Some areas use loose typing (e.g., icon names as strings)
5. **Button Interaction Logic**: Interactive element detection relies on hardcoded IDs rather than structural analysis
6. **Animation Coordination**: Managing multiple animation states (transitions, morphing) requires careful timing

This architecture successfully handles the complex requirements of mixed educational content with sophisticated navigation and progress tracking.
