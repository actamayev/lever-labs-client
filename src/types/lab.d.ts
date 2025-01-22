declare global {
	type ActivityTitles =
	| "Start"
	| "Reading"
	| "Video"
	| "Code"
	| "Optional"

	interface Lesson {
		progress: number | null
		lessonUrl: LabPages
		lessonName: string
		activityType: ActivityTitles
	}
}

export {}
