declare global {
	type ActivityTitles =
	| "Start"
	| "Demo"
	| "Reading"
	| "Video"
	| "Code"
	| "Optional"

	// Top: 1, bottom: 9
	type VerticalPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

	interface Lesson {
		progress: number | null
		lessonUrl: LabPages
		lessonName: string
		activityType: ActivityTitles
		verticalPosition: VerticalPosition
	}
}

export {}
