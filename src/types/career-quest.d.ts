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

	interface CareerData {
		careerName: string
		totalLessons: number
		lessonsComplete: number
		careerUrl: CareerQuestPages
		careerIcon: LucideIcon
		componentsUsed: ComponentsUsedCareerData[]
		backgroundColor: string
		codingConcepts: CodingConceptName[]
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
