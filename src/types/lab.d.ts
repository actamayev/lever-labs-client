declare global {
	type ActivityType =
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

	type Element1Sections =
	| "LED"
	| "Motor"

	interface ContentBlock {
		id: string
		text: React.ReactNode
		action: {
			type: "continue" | "quiz"
			imageChange?: {
				images: string[]  // New images to add to navigation
				autoSelect?: number  // Which image to show
			}
			quiz?: {
				questions: Array<{
						question: string
						choices: Array<{
						text: string
						correct: boolean
						explanation?: string
					}>
				}>
			}
		}
	}

	interface ReadingState {
		revealedBlocks: string[]
		completedQuizzes: string[]
		availableImages: string[]
		currentImageIndex: number
	}

	// TODO: make blockid be a special string
	interface ActiveQuiz {
		blockId: string
		questionIndex: number
		selectedChoice: number | null
		showExplanation: boolean
	}
}

export {}
