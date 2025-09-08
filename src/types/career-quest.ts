import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"
import { BinaryEvaluationResult, CareerUUID, ChallengeUUID,
	ChatMessageRole, CqChallengeData, SandboxChatMessage } from "@bluedotrobots/common-ts"

declare global {
	type ComponentName =
	| "Motors + Encoders"
	| "Side Distance Sensors"
	| "Multizone Distance Sensor"
	| "IMU"
	| "LED"
	| "Speaker"
	| "IR Sensors"
	| "Color Sensor"
	| "Screen"
	| "Buttons"

	// Existing interface for challenge cards
	interface CareerData {
		careerUUID: CareerUUID
		careerName: string
		careerDescription: string
		careerUrl: CareerQuestPages
		careerIcon: LucideIcon
		componentsUsed: ComponentName[]
		backgroundColor: DuolingoColors
		codingConcepts: CodingConceptName[]
		expectedCompletionTime: string
	}

	type CodingConceptName =
	| "Variables"
	| "Loops"
	| "Conditional Statements"
	| "Functions"
	| "Boolean Logic"

	interface ChallengeChatMessage {
		id: string
		role: ChatMessageRole
		content: string
		timestamp: Date
		isStreaming?: boolean
		isCheckCodeRequest?: boolean
		evaluationResult?: BinaryEvaluationResult
		isHintRequest?: boolean
		isHintResponse?: boolean
		shouldShowHintButton?: boolean
	}

	interface CareerUUIDChallengeUUID {
		careerUUID: CareerUUID
		challengeUUID: ChallengeUUID
	}

	type RightContent =
	| { type: "icon", iconKey: string } // Renamed from "image" to avoid confusion
	| { type: "image", src: string, alt: string, width: number, height: number }
	| { type: "video", src: string, poster?: string, autoplay?: boolean, loop?: boolean, muted?: boolean }
	| { type: "component", component: (() => ReactNode) | string }
	| { type: "challenge", challengeData: CqChallengeData }
	| { type: "chat" }
	| { type: "null" }

	// Morphing text variant for navigation-controlled morphing
	interface MorphingVariant {
		id: string
		text: string
		rightContent: RightContent
	}

	interface TextTransition {
		type: "fade"
		duration: number // milliseconds, e.g. 800
		color: "black" // Always black for consistency
	}

	interface TextParentSection {
		type: "textParent"
		id: string
		children: (TextSection | MorphingTextSection)[]
		transition?: TextTransition // Optional transition when navigating away from this section
	}

	interface TextSection {
		type: "text"
		id: string
		content: string | ((onAdvance?: () => void) => ReactNode)
		rightSideContent: string | RightContent // Updated to support both
		triggerFunctionEnter?: (() => Promise<void>)
		triggerFunctionExit?: (() => Promise<void>)
	}

	interface ImageContent {
		type: "image"
		src: string  // e.g., "/images/career-quest/pip-intro.jpg"
		alt?: string
		width?: number
		height?: number
	}

	// Helper type for creating video content easily
	interface VideoContent {
		type: "video"
		src: string  // e.g., "/videos/career-quest/pip-demo.mp4"
		poster?: string // Optional poster image path
		autoplay?: boolean
		loop?: boolean
		muted?: boolean
	}

	// New morphing text section type
	interface MorphingTextSection {
		type: "morphingText"
		id: string
		staticText: string // Text that stays at the top
		morphingVariants: MorphingVariant[] // Array of morphing text options
		triggerFunctionEnter?: (() => Promise<void>) // Optional function to run when navigating to this section
		triggerFunctionExit?: (() => Promise<void>) // Optional function to run when navigating away from this section
	}

	interface ChallengeSection {
		type: "challenge"
		id: ChallengeUUID
		challengeData: CqChallengeData
		// Challenge completion determines if next sections are unlocked
	}

	type CareerSection = ChallengeSection | TextParentSection

	interface CareerQuestData {
		careerUUID: CareerUUID
		careerTitle: string
		careerColor: DuolingoColors
		needsChat: boolean
		sections: CareerSection[]
	}

	// Main slide types - no longer flattened
	interface TextParentMainSlide {
		type: "textParent"
		id: string
		data: TextParentSection
	}

	interface ChallengeMainSlide {
		type: "challenge"
		id: ChallengeUUID
		data: CqChallengeData
	}

	type MainSlide = TextParentMainSlide | ChallengeMainSlide

	interface CareerChatMessage extends SandboxChatMessage {
		id: string
		isStreaming?: boolean
	}

	interface CareerDataForMessage {
		careerName: string
		careerDescription: string
		whatUserSees: ReactNode
	}
}

export {}
