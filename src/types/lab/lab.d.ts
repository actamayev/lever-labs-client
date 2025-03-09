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

	type UncertainActivityType =
	| ActivityType
	| "Loading"

	// Top: 1, bottom: 9
	type VerticalPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

	type ArcDirection = "up" | "down" | "straight"

	interface DefaultActivity {
		activityUrl: LabPages
		verticalPosition: VerticalPosition
		activityUUID: ActivityUUID
		arcDirection?: ArcDirection
		// stackWithPrevious?: boolean
		// skipConnection?: boolean
	}

	type ProgressStatus = "IN_PROGRESS" | "COMPLETED" | null

	interface FullActivity extends DefaultActivity {
		activityStatus: ProgressStatus
		activityName: string
		activityType: UncertainActivityType
	}

	type LessonNames =
	| "LED"
	// | "Motor"

	type ReadingNames =
	| "Introduction to LEDs"
	| "Voltage"
	| "RGB LEDs"
	| "Introduction to Code"
	| "LEDs and Loops"
	| "LED Advantages"
	| "LEDs in Robotics"
}

export {}
