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
		percentComplete: number
		careerUrl: CareerQuestPages
		backgroundUrl: string
		componentsUsed: ComponentsUsedCareerData[]
	}
}

export {}
