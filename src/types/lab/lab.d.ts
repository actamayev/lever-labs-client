declare global {
	type ActivityType =
	| "Demo"
	| "Reading"
	| "Video"
	| "Code"
	| "Summary"

	type ActivityTypeRoutePath =
	| ActivityType
	| "Code-1"
	| "Code-2"
	| "Code-3"

	// Top: 1, bottom: 9
	type VerticalPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

	type ArcDirection = "up" | "down" | "straight"

	interface Lesson {
		progress: number | null
		lessonUrl: LabPages
		lessonName: string
		activityType: ActivityType
		verticalPosition: VerticalPosition
		stackWithPrevious?: boolean
		skipConnection?: boolean
		arcDirection?: ArcDirection
	}

	type ElementNumbers = 1 | 2 | 3

	type Element1Lessons =
	| "LED"
	| "Motor"
}

export {}
