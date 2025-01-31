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
		activityQuestionIndex: number
	}

	interface AnswerChoice {
		text: string
		correct: boolean
		explanation?: string
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

	interface ReadingStateWithAttempts {
		revealedBlocks: string[]
		completedQuizzes: string[]
		quizAttempts: QuizAttempt[]
	}
}

export {}
