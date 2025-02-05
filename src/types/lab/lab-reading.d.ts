declare global {
	interface ContentBlock {
		id: ContentBlockID
		text: React.ReactNode
		action: {
			type: "continue" | "quiz" | null
			quiz?: QuizQuestions
		}
	}

	type QuestionUUID = string & { readonly __brand: unique symbol }

	interface QuizQuestions {
		questions: Question[]
	}

	type FourAnswers = readonly [AnswerChoice, AnswerChoice, AnswerChoice, AnswerChoice]

	interface Question {
		question: string
		choices: FourAnswers
		questionUUID: QuestionUUID
	}

	type AnswerChoiceID = 1 | 2 | 3 | 4

	interface AnswerChoice {
		text: string
		correct: boolean
		answerChoiceId: AnswerChoiceID
		explanation?: string
	}

	interface ActiveQuiz {
		blockId: ContentBlockID
		questionUUID: QuestionUUID
		isCorrect: boolean | null // null if the user hasn't answered the question yet
	}

	interface QuizAnswerAttempt {
		questionUUID: QuestionUUID
		answerChoiceId: AnswerChoiceID
		isCorrect: boolean
	}

	interface QuizAttempt {
		questionUUID: QuestionUUID
		answerAttempts: QuizAnswerAttempt[]
	}

	interface DraftAnswer {
		questionUUID: QuestionUUID
		answerChoiceId: AnswerChoiceID
		isCorrect: boolean | null
	}

	interface ExplanationData {
		questionUUID: QuestionUUID
		explanation: string
		isCorrect: boolean
	}

	type BlockHeightState = "normal" | "expanded" | "minimal"
}

export {}
