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
	}

	// New interface for introduction card
	interface IntroductionData {
		title: string
		description: string
		totalLessons: number
		lessonsComplete: number
		introUrl: CareerQuestPages
		introIcon: LucideIcon
		componentsUsed: ComponentsUsedCareerData[]
		backgroundColor: DuolingoColors
		codingConcepts: CodingConceptName[]
		timeToComplete: number
	}

	type WorkbenchItemsToShow = "battery" | "network" | "volume" | null

	type CodingConceptName =
	| "Variables"
	| "Loops"
	| "Conditional Statements"
	| "Functions"
	| "Boolean Logic"
}

export {}
