declare global {
	type ActivityTypePath =
	| `Reading/${string}`
	// | `Video/${string}
	| `Demo/${string}`
	| `Code/${string}`
	| "Summary"

	type ActivityType =
	| "Reading"
	// | "Video"
	| "Code"
	| "Demo"
	| "Summary"

	// Top: 1, bottom: 9
	type VerticalPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

	type ArcDirection = "up" | "down" | "straight"

	interface Activity {
		progress: number | null
		activityUrl: LabPages
		lessonName: string
		activityType: ActivityType
		verticalPosition: VerticalPosition
		// stackWithPrevious?: boolean
		// skipConnection?: boolean
		arcDirection?: ArcDirection
	}

	type ElementNumbers = 1 | 2 | 3

	type Element1Lessons =
	| "LED"
	// | "Motor"

	type ReadingNames =
	| "Introduction to LEDs"
	| "Voltage"
	| "RGB LEDs"
}

export {}
