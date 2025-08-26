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

	interface ComponentsUsedCareerData {
		componentName: ComponentName
		componentDifficulty: 1 | 2 | 3
	}

	// Existing interface for challenge cards
	interface CareerData {
		careerUUID: CareerUUID
		careerName: string
		careerDescription: string
		careerUrl: CareerQuestPages
		careerIcon: LucideIcon
		componentsUsed: ComponentsUsedCareerData[]
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
	| { type: "image", icon: string }
	| { type: "component", component: (() => ReactNode) }
	| { type: "challenge", challengeData: CqChallengeData }
	| { type: "chat" }

	// Morphing text variant for navigation-controlled morphing
	interface MorphingVariant {
		id: string
		text: string
		rightContent: RightContent
	}

	interface TextParentSection {
		type: "textParent"
		id: string
		children: (TextSection | MorphingTextSection)[]
	}

	interface TextSection {
		type: "text"
		id: string
		content: (() => ReactNode)
		triggerImage: string // Lucide icon name
	}

	// New morphing text section type
	interface MorphingTextSection {
		type: "morphingText"
		id: string
		staticText: string // Text that stays at the top
		morphingVariants: MorphingVariant[] // Array of morphing text options
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
		initialImage: string // Lucide icon name for the first image
		careerColor: DuolingoColors
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
