declare global {
	interface ContentBlock {
		id: ContentBlockID
		text: React.ReactNode
		action: {
			type: "continue" | "quiz" | null
			quiz?: QuizQuestions
		}
	}

	interface QuizQuestions {
		questions: Question[]
	}

	type FourAnswers = readonly [AnswerChoice, AnswerChoice, AnswerChoice, AnswerChoice]

	interface Question {
		question: string
		choices: FourAnswers
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

	interface QuizAnswerAttempt {
		questionIndex: number
		selectedChoice: number
		isCorrect: boolean
	}

	interface ActiveQuiz {
		blockId: ContentBlockID
		questionIndex: number
		selectedChoice: number | null
		showExplanation: boolean
		isReview?: boolean
		previousAnswers: QuizAnswerAttempt[]
	}

	interface QuizAttempt {
		blockId: ContentBlockID
		answers: QuizAnswerAttempt[]
	}

	interface ReadingStateWithAttempts extends ReadingState {
		quizAttempts: QuizAttempt[]
	}
}

export {}
