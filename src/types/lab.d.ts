declare global {
	type ActivityType =
	| "Start"
	| "Demo"
	| "Reading"
	| "Video"
	| "Code"
	| "Code-1"
	| "Code-2"
	| "Code-3"
	| "Summary"

	// Top: 1, bottom: 9
	type VerticalPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

	interface Lesson {
		progress: number | null
		lessonUrl: LabPages
		lessonName: string
		activityType: ActivityType
		verticalPosition: VerticalPosition
		stackWithPrevious?: boolean
	}
}

export {}
