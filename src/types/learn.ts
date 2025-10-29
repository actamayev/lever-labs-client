import { LessonQuestionMap, Question, Lesson, QuestionType } from "@lever-labs/common-ts/types/learn"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"

declare global {
	interface LocalQuestion extends Omit<Question, "questionType"> {
		userHasAnsweredCorrectly?: boolean
		questionType: QuestionType | "DEMO"
		fillInBlankAnswer?: {
			blocklyJson: BlocklyJson
			cppCode: string
		}
		// Server-provided feedback for fill-in-the-blank submissions
		fillInBlankFeedback?: string
		actionToCodeOpenEndedAnswer?: {
			blocklyJson: BlocklyJson
			cppCode: string
		}
		// Server-provided feedback for action-to-code-open-ended submissions
		actionToCodeOpenEndedFeedback?: string
		// Server-provided correct answer choice ID for multiple choice questions
		correctAnswerChoiceId?: number
	}

	interface LocalLessonQuestionMap extends Omit<LessonQuestionMap, "question"> {
		question: LocalQuestion
	}

	interface LocalLesson extends Lesson {
		isRetrievingDetailedData: boolean
		hasRetrievedDetailedData: boolean
		lessonQuestionMap?: LocalLessonQuestionMap[]
		numberQuestionsCorrect: number
	}

	interface CurrentQuestionState {
		question: LocalQuestion
		selectedAnswerId: number | null
		currentQuestionIndex: number
		totalQuestions: number
		questionOrder: number[]
		currentOrderPosition: number
		originalQuestionCount: number
	}

	interface SubmitMCQResponse {
		isCorrect: boolean
		correctAnswerChoiceId?: number
	}
}

export {}
