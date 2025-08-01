import { LucideIcon } from "lucide-react"
import { BinaryEvaluationResult, CareerUUID, ChallengeUUID, ChatMessageRole, CqChallengeData } from "@bluedotrobots/common-ts"

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
		careerName: string
		careerDescription: string
		totalLessons: number
		lessonsComplete: number
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

	interface CareerQuestChatMessage {
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

	type RightContent = { type: "image", icon: string } | { type: "challenge", challengeData: CqChallengeData }

	interface TextParentSection {
		type: "textParent"
		id: string
		children: TextSection[]
	}

	interface TextSection {
		type: "text"
		id: string
		content: string
		triggerImage: string // Lucide icon name
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
}

export {}
