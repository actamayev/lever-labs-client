import { LessonQuestionMap, Question, Lesson } from "@lever-labs/common-ts/types/learn"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"

declare global {
	interface LocalQuestion extends Omit<Question, "questionType"> {
		userHasAnsweredCorrectly?: boolean
		questionType: Question["questionType"] | "DEMO"
		fillInBlankAnswer?: {
			blocklyJson: BlocklyJson
			cppCode: string
		}
		// Server-provided feedback for fill-in-the-blank submissions
		fillInBlankFeedback?: string
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
	}
}

export {}
