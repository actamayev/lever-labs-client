import { LessonQuestionMap, Question, Lesson } from "@lever-labs/common-ts/types/learn"

declare global {
	interface LocalQuestion extends Question {
		userHasAnsweredCorrectly?: boolean
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
