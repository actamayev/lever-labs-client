import { action, makeAutoObservable } from "mobx"
import { Lesson, LessonQuestionMap, Question } from "@lever-labs/common-ts/types/learn"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"

interface LocalQuestion extends Question {
	userHasAnsweredCorrectly?: boolean
}

interface LocalLessonQuestionMap extends Omit<LessonQuestionMap, "question"> {
	question: LocalQuestion
}

export interface LocalLesson extends Lesson {
	isRetrievingDetailedData: boolean
	hasRetrievedDetailedData: boolean
	lessonQuestionMap?: LocalLessonQuestionMap[]
}

class LearnClass {
	public isRetrievingAllLessons = false
	public hasRetrievedAllLessons = false
	public lessonsById: Record<LessonUUID, LocalLesson> = {}

	constructor() {
		makeAutoObservable(this)
	}

	public setIsRetrievingAllLessons = action((isRetrievingAllLessons: boolean): void => {
		this.isRetrievingAllLessons = isRetrievingAllLessons
	})

	public setHasRetrievedAllLessons = action((hasRetrievedAllLessons: boolean): void => {
		this.hasRetrievedAllLessons = hasRetrievedAllLessons
	})

	public setLessons = action((lessons: Lesson[]): void => {
		const map: Record<LessonUUID, LocalLesson> = {}
		for (const lesson of lessons) {
			map[lesson.lessonId] = {
				...lesson,
				isRetrievingDetailedData: false,
				hasRetrievedDetailedData: false,
			}
		}
		this.lessonsById = map
	})

	public setIsRetrievingDetailedData = action((lessonId: LessonUUID, isRetrieving: boolean): void => {
		const lesson = this.lessonsById[lessonId]
		if (!lesson) return
		lesson.isRetrievingDetailedData = isRetrieving
	})

	public setHasRetrievedDetailedData = action((lessonId: LessonUUID, hasRetrieved: boolean): void => {
		const lesson = this.lessonsById[lessonId]
		if (!lesson) return
		lesson.hasRetrievedDetailedData = hasRetrieved
	})

	public setLessonQuestionMap = action((lessonId: LessonUUID, lessonQuestionMap: LessonQuestionMap[]): void => {
		const lesson = this.lessonsById[lessonId]
		if (!lesson) return
		lesson.lessonQuestionMap = lessonQuestionMap as LocalLessonQuestionMap[]
	})

	// eslint-disable-next-line complexity
	public setQuestionAnsweredCorrectness = action((lessonId: LessonUUID, questionId: string, answerChoiceId: number): void => {
		const lesson = this.lessonsById[lessonId]
		if (!lesson || !lesson.lessonQuestionMap) return
		for (const mapEntry of lesson.lessonQuestionMap) {
			if (mapEntry.question.questionId !== questionId) continue

			const q = mapEntry.question
			let isCorrect = false

			if (q.questionType === "BLOCK_TO_FUNCTION" && q.blockToFunctionFlashcard) {
				const choice = q.blockToFunctionFlashcard.blockToFunctionAnswerChoice.find(
					(c): boolean => c.blockToFunctionAnswerChoiceId === answerChoiceId
				)
				isCorrect = choice ? choice.isCorrect : false
			} else if (q.questionType === "FUNCTION_TO_BLOCK" && q.functionToBlockFlashcard) {
				const choice = q.functionToBlockFlashcard.functionToBlockAnswerChoice.find(
					(c): boolean => c.functionToBlockAnswerChoiceId === answerChoiceId
				)
				isCorrect = choice ? choice.isCorrect : false
			}

			(mapEntry.question as LocalQuestion).userHasAnsweredCorrectly = isCorrect
			break
		}
	})

	public getLesson = (lessonId: LessonUUID): LocalLesson | undefined => {
		return this.lessonsById[lessonId]
	}

	public isRetrievingDetailedData = (lessonId: LessonUUID): boolean => {
		return this.lessonsById[lessonId]?.isRetrievingDetailedData === true
	}

	public hasRetrievedDetailedData = (lessonId: LessonUUID): boolean => {
		return this.lessonsById[lessonId]?.hasRetrievedDetailedData === true
	}

	public setLessonCompleted = action((lessonId: LessonUUID): void => {
		const lesson = this.lessonsById[lessonId]
		if (!lesson) return
		lesson.isCompleted = true
	})

	public logout(): void {
		this.isRetrievingAllLessons = false
		this.hasRetrievedAllLessons = false
		this.lessonsById = {}
	}
}

const learnClass = new LearnClass()

export default learnClass
