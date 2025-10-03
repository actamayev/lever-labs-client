import { action, makeAutoObservable } from "mobx"
import { Lesson, LessonQuestionMap } from "@lever-labs/common-ts/types/learn"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import submitFunctionToBlockAnswer from "../utils/learn/submit-function-to-block-answer"

class LearnClass {
	public isRetrievingAllLessons = false
	public hasRetrievedAllLessons = false
	public lessonsById: Map<LessonUUID, LocalLesson> = new Map()
	public currentQuestionState: CurrentQuestionState | null = null
	public isInQuestionConfirmationStage = false
	public lastAnswerWasCorrect = false

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
		for (const lesson of lessons) {
			this.lessonsById.set(lesson.lessonId, {
				...lesson,
				isRetrievingDetailedData: false,
				hasRetrievedDetailedData: false,
			})
		}
	})

	public setIsRetrievingDetailedData = action((lessonId: LessonUUID, isRetrieving: boolean): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson) return
		lesson.isRetrievingDetailedData = isRetrieving
	})

	public setHasRetrievedDetailedData = action((lessonId: LessonUUID, hasRetrieved: boolean): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson) return
		lesson.hasRetrievedDetailedData = hasRetrieved
	})

	public setLessonQuestionMap = action((lessonId: LessonUUID, lessonQuestionMap: LessonQuestionMap[]): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson) return
		lesson.lessonQuestionMap = lessonQuestionMap as LocalLessonQuestionMap[]
	})

	// eslint-disable-next-line complexity
	public setQuestionAnsweredCorrectness = action((lessonId: LessonUUID, questionId: string, answerChoiceId: number): void => {
		const lesson = this.lessonsById.get(lessonId)
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
		return this.lessonsById.get(lessonId)
	}

	public isRetrievingDetailedData = (lessonId: LessonUUID): boolean => {
		return this.lessonsById.get(lessonId)?.isRetrievingDetailedData === true
	}

	public hasRetrievedDetailedData = (lessonId: LessonUUID): boolean => {
		return this.lessonsById.get(lessonId)?.hasRetrievedDetailedData === true
	}

	public setLessonCompleted = action((lessonId: LessonUUID): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson) return
		lesson.isCompleted = true
	})

	public setCurrentQuestion = action((lessonId: LessonUUID, questionIndex: number): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson?.lessonQuestionMap) return

		const sortedQuestions = [...lesson.lessonQuestionMap].sort((a, b): number => a.order - b.order)
		const currentQuestion = sortedQuestions[questionIndex]

		if (!currentQuestion) return

		this.currentQuestionState = {
			question: currentQuestion.question,
			selectedAnswerId: null,
			currentQuestionIndex: questionIndex,
			totalQuestions: sortedQuestions.length
		}
	})

	public setSelectedAnswer = action((answerId: number | null): void => {
		if (!this.currentQuestionState) return
		this.currentQuestionState.selectedAnswerId = answerId
	})

	public checkCurrentAnswer = action(async (lessonId: LessonUUID): Promise<boolean> => {
		if (!this.currentQuestionState) return false

		const { question, selectedAnswerId, currentQuestionIndex } = this.currentQuestionState
		let isCorrect = false

		if (question.questionType === "FUNCTION_TO_BLOCK" && question.functionToBlockFlashcard) {
			const choice = question.functionToBlockFlashcard.functionToBlockAnswerChoice.find(
				(c): boolean => c.functionToBlockAnswerChoiceId === selectedAnswerId
			)
			isCorrect = choice ? choice.isCorrect : false
			await submitFunctionToBlockAnswer(lessonId, question.questionId, selectedAnswerId || 0)
		}

		// Update the question's correctness in the learn class
		this.setQuestionAnsweredCorrectness(lessonId, question.questionId, selectedAnswerId || 0)

		// Set confirmation stage state
		this.isInQuestionConfirmationStage = true
		this.lastAnswerWasCorrect = isCorrect

		return isCorrect
	})

	public continueToNextQuestion = action((lessonId: LessonUUID): void => {
		if (!this.currentQuestionState) return

		const { currentQuestionIndex } = this.currentQuestionState

		// Move to next question if not the last question
		if (currentQuestionIndex < this.currentQuestionState.totalQuestions - 1) {
			this.setCurrentQuestion(lessonId, currentQuestionIndex + 1)
		}

		// Exit confirmation stage
		this.isInQuestionConfirmationStage = false
		this.lastAnswerWasCorrect = false
	})

	public logout(): void {
		this.isRetrievingAllLessons = false
		this.hasRetrievedAllLessons = false
		this.lessonsById = new Map()
		this.currentQuestionState = null
	}
}

const learnClass = new LearnClass()

export default learnClass
