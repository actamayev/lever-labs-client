declare global {
	interface ContentBlock {
		id: ContentBlockID
		text: React.ReactNode
		action: {
			type: "continue" | "quiz"
			quiz?: {
				questions: Question[]
			}
		}
	}

	interface Question {
		question: string
		choices: AnswerChoice[]
	}

	interface AnswerChoice {
		text: string
		correct: boolean
		explanation?: string
	}

	interface ReadingState {
		revealedBlocks: string[]
		completedQuizzes: string[]
	}

	// TODO: make blockid be a special string
	interface ActiveQuiz {
		blockId: ContentBlockID
		questionIndex: number
		selectedChoice: number | null
		showExplanation: boolean
	}
}

export {}
