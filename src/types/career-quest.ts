import { BinaryEvaluationResult, ChatMessageRole } from "@bluedotrobots/common-ts"
import { LucideIcon } from "lucide-react"

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
	}
}

export {}
