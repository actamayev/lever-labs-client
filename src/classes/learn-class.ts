import { action, makeAutoObservable } from "mobx"
import { Lesson } from "@lever-labs/common-ts/types/learn"
import { soundManager } from "./utility/sound-manager-class"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import submitFillInBlankAnswer from "../utils/learn/submit-fill-in-blank-answer"
import submitFunctionToBlockAnswer from "../utils/learn/submit-function-to-block-answer"
import submitBlockToFunctionAnswer from "../utils/learn/submit-block-to-function-answer"
import submitActionToCodeMultipleChoiceAnswer from "../utils/learn/submit-action-to-code-multiple-choice-answer"
import submitActionToCodeOpenEndedAnswer from "../utils/learn/submit-action-to-code-open-ended-answer"

class LearnClass {
	public isRetrievingAllLessons = false
	public hasRetrievedAllLessons = false
	public lessonsById: Map<LessonUUID, LocalLesson> = new Map()
	public currentQuestionState: CurrentQuestionState | null = null
	public isInQuestionConfirmationStage = false
	public lastAnswerWasCorrect = false
	public isExitDialogOpen = false

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
			this.setSingleLesson({
				...lesson,
				isRetrievingDetailedData: false,
				hasRetrievedDetailedData: false,
				numberQuestionsCorrect: 0,
			})
		}
	})

	public setSingleLesson = action((lesson: LocalLesson): void => {
		this.lessonsById.set(lesson.lessonId, {
			...lesson,
			numberQuestionsCorrect: lesson.numberQuestionsCorrect ?? 0
		})
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

	// eslint-disable-next-line complexity
	public setQuestionAnsweredCorrectness = action((lessonId: LessonUUID, questionId: string, answerChoiceId: number): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson || !lesson.lessonQuestionMap) return

		let wasCorrect = false
		let isCorrect = false

		for (const mapEntry of lesson.lessonQuestionMap) {
			if (mapEntry.question.questionId !== questionId) continue

			const q = mapEntry.question
			wasCorrect = q.userHasAnsweredCorrectly === true

			if (q.questionType === "DEMO") {
				// Demo questions are always considered correct
				isCorrect = true
			} else if (q.questionType === "BLOCK_TO_FUNCTION" && q.blockToFunctionFlashcard) {
				const choice = q.blockToFunctionFlashcard.blockToFunctionAnswerChoice.find(
					(c): boolean => c.blockToFunctionAnswerChoiceId === answerChoiceId
				)
				isCorrect = choice ? choice.isCorrect : false
			} else if (q.questionType === "FUNCTION_TO_BLOCK" && q.functionToBlockFlashcard) {
				const choice = q.functionToBlockFlashcard.functionToBlockAnswerChoice.find(
					(c): boolean => c.functionToBlockAnswerChoiceId === answerChoiceId
				)
				isCorrect = choice ? choice.isCorrect : false
			} else if (q.questionType === "ACTION_TO_CODE_MULTIPLE_CHOICE" && q.actionToCodeMultipleChoice) {
				const choice = q.actionToCodeMultipleChoice.actionToCodeMultipleChoiceAnswerChoice.find(
					(c): boolean => c.actionToCodeMultipleChoiceAnswerChoiceId === answerChoiceId
				)
				isCorrect = choice ? choice.isCorrect : false
			}

			(mapEntry.question as LocalQuestion).userHasAnsweredCorrectly = isCorrect
			break
		}

		// Update the counter based on the change in correctness
		if (isCorrect && !wasCorrect) {
			lesson.numberQuestionsCorrect += 1
		} else if (!isCorrect && wasCorrect) {
			lesson.numberQuestionsCorrect -= 1
		}

		if (isCorrect) {
			soundManager.playCorrect()
		} else {
			soundManager.playWrong()
		}
	})

	public setFillInBlankAnsweredCorrectness = action((lessonId: LessonUUID, questionId: string, isCorrect: boolean): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson || !lesson.lessonQuestionMap) return

		let wasCorrect = false
		let questionFound = false

		for (const mapEntry of lesson.lessonQuestionMap) {
			if (mapEntry.question.questionId !== questionId) continue
			const q = mapEntry.question
			wasCorrect = q.userHasAnsweredCorrectly === true;
			(mapEntry.question as LocalQuestion).userHasAnsweredCorrectly = isCorrect
			questionFound = true
			break
		}

		// Only update the counter if we actually found and updated the question
		if (questionFound) {
			if (isCorrect && !wasCorrect) {
				lesson.numberQuestionsCorrect += 1
			} else if (!isCorrect && wasCorrect) {
				lesson.numberQuestionsCorrect -= 1
			}
		}
	})

	public setActionToCodeOpenEndedAnsweredCorrectness = action((lessonId: LessonUUID, questionId: string, isCorrect: boolean): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson || !lesson.lessonQuestionMap) return

		let wasCorrect = false
		let questionFound = false

		for (const mapEntry of lesson.lessonQuestionMap) {
			if (mapEntry.question.questionId !== questionId) continue
			const q = mapEntry.question
			wasCorrect = q.userHasAnsweredCorrectly === true;
			(mapEntry.question as LocalQuestion).userHasAnsweredCorrectly = isCorrect
			questionFound = true
			break
		}

		// Only update the counter if we actually found and updated the question
		if (questionFound) {
			if (isCorrect && !wasCorrect) {
				lesson.numberQuestionsCorrect += 1
			} else if (!isCorrect && wasCorrect) {
				lesson.numberQuestionsCorrect -= 1
			}
		}

		if (isCorrect) {
			soundManager.playCorrect()
		} else {
			soundManager.playWrong()
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

	public setFillInBlankAnswer = action((questionId: string, blocklyJson: BlocklyJson, cppCode: string): void => {
		// Find the question in the current lesson and store the answer
		const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)

		if (!lesson?.lessonQuestionMap) return

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) return

		questionMap.question.fillInBlankAnswer = {
			blocklyJson,
			cppCode
		}
	})

	public setActionToCodeOpenEndedAnswer = action((questionId: string, blocklyJson: BlocklyJson, cppCode: string): void => {
		// Find the question in the current lesson and store the answer
		const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)

		if (!lesson?.lessonQuestionMap) return

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) return

		questionMap.question.actionToCodeOpenEndedAnswer = {
			blocklyJson,
			cppCode
		}
	})

	// eslint-disable-next-line complexity
	public checkCurrentAnswer = action(async (lessonId: LessonUUID): Promise<boolean> => {
		if (!this.currentQuestionState) return false

		const { question, selectedAnswerId } = this.currentQuestionState
		let isCorrect = false

		if (question.questionType === "DEMO") {
			// Demo questions are always considered correct and don't need submission
			isCorrect = true
		} else if (question.questionType === "FILL_IN_BLANK" && question.fillInBlankAnswer) {
			// For fill-in-blank, submit the CPP code and capture feedback
			const result = await submitFillInBlankAnswer(
				lessonId,
				question.questionId,
				question.fillInBlankAnswer.cppCode
			)
			isCorrect = result.isCorrect
			;((): void => {
				// Persist feedback on the question for rendering in the footer
				const lesson = this.lessonsById.get(lessonId)
				if (!lesson?.lessonQuestionMap) return
				const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === question.questionId)
				if (!questionMap) return
				(questionMap.question as LocalQuestion).fillInBlankFeedback = result.feedback
			})()
		} else if (question.questionType === "FUNCTION_TO_BLOCK" && question.functionToBlockFlashcard) {
			const choice = question.functionToBlockFlashcard.functionToBlockAnswerChoice.find(
				(c): boolean => c.functionToBlockAnswerChoiceId === selectedAnswerId
			)
			isCorrect = choice ? choice.isCorrect : false
			await submitFunctionToBlockAnswer(lessonId, question.questionId, selectedAnswerId || 0)
		} else if (question.questionType === "BLOCK_TO_FUNCTION" && question.blockToFunctionFlashcard) {
			const choice = question.blockToFunctionFlashcard.blockToFunctionAnswerChoice.find(
				(c): boolean => c.blockToFunctionAnswerChoiceId === selectedAnswerId
			)
			isCorrect = choice ? choice.isCorrect : false
			await submitBlockToFunctionAnswer(lessonId, question.questionId, selectedAnswerId || 0)
		} else if (question.questionType === "ACTION_TO_CODE_MULTIPLE_CHOICE" && question.actionToCodeMultipleChoice) {
			const choice = question.actionToCodeMultipleChoice.actionToCodeMultipleChoiceAnswerChoice.find(
				(c): boolean => c.actionToCodeMultipleChoiceAnswerChoiceId === selectedAnswerId
			)
			isCorrect = choice ? choice.isCorrect : false
			await submitActionToCodeMultipleChoiceAnswer(lessonId, question.questionId, selectedAnswerId || 0)
		} else if (question.questionType === "ACTION_TO_CODE_OPEN_ENDED" && question.actionToCodeOpenEndedAnswer) {
			// For action-to-code-open-ended, submit the CPP code and capture feedback
			const result = await submitActionToCodeOpenEndedAnswer(
				lessonId,
				question.questionId,
				question.actionToCodeOpenEndedAnswer.cppCode
			)
			isCorrect = result.isCorrect
			;((): void => {
				// Persist feedback on the question for rendering in the footer
				const lesson = this.lessonsById.get(lessonId)
				if (!lesson?.lessonQuestionMap) return
				const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === question.questionId)
				if (!questionMap) return
				(questionMap.question as LocalQuestion).actionToCodeOpenEndedFeedback = result.feedback
			})()
		}

		// Update the question's correctness in the learn class
		if (question.questionType === "FILL_IN_BLANK") {
			this.setFillInBlankAnsweredCorrectness(lessonId, question.questionId, isCorrect)
		} else if (question.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
			this.setActionToCodeOpenEndedAnsweredCorrectness(lessonId, question.questionId, isCorrect)
		} else {
			this.setQuestionAnsweredCorrectness(lessonId, question.questionId, selectedAnswerId || 0)
		}

		// Set confirmation stage state
		this.setIsInQuestionConfirmationStage(true)
		this.setLastAnswerWasCorrect(isCorrect)

		return isCorrect
	})

	public continueToNextQuestion = action((lessonId: LessonUUID): void => {
		if (!this.currentQuestionState) return

		const { currentQuestionIndex, question } = this.currentQuestionState

		// If this is a demo question, mark it as correct and increment progress
		if (question.questionType === "DEMO") {
			const lesson = this.lessonsById.get(lessonId)
			if (lesson && question.userHasAnsweredCorrectly !== true) {
				question.userHasAnsweredCorrectly = true
				lesson.numberQuestionsCorrect += 1
			}
		}

		// Move to next question if not the last question
		if (currentQuestionIndex < this.currentQuestionState.totalQuestions - 1) {
			this.setCurrentQuestion(lessonId, currentQuestionIndex + 1)
		}

		// Exit confirmation stage
		this.isInQuestionConfirmationStage = false
		this.lastAnswerWasCorrect = false
	})

	public retryCurrentQuestion = action((): void => {
		// Exit confirmation stage without advancing; allow user to try again
		this.isInQuestionConfirmationStage = false
		this.lastAnswerWasCorrect = false
		this.setSelectedAnswer(null)
		// Clear any previous feedback when retrying
		if (!this.currentQuestionState) return
		const { question } = this.currentQuestionState
		if (question.questionType === "FILL_IN_BLANK" || question.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
			const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
				l.lessonQuestionMap?.some((q): boolean => q.question.questionId === question.questionId) ?? false
			)
			if (!lesson?.lessonQuestionMap) return
			const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === question.questionId)
			if (!questionMap) return
			if (question.questionType === "FILL_IN_BLANK") {
				;(questionMap.question as LocalQuestion).fillInBlankFeedback = ""
			} else if (question.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
				;(questionMap.question as LocalQuestion).actionToCodeOpenEndedFeedback = ""
			}
		}
	})

	private setIsInQuestionConfirmationStage = action((isInQuestionConfirmationStage: boolean): void => {
		this.isInQuestionConfirmationStage = isInQuestionConfirmationStage
	})

	private setLastAnswerWasCorrect = action((lastAnswerWasCorrect: boolean): void => {
		this.lastAnswerWasCorrect = lastAnswerWasCorrect
	})

	public resetLessonProgress = action((lessonId: LessonUUID): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson || !lesson.lessonQuestionMap) return

		// Reset the progress counter to 0
		lesson.numberQuestionsCorrect = 0

		// Reset all questions to unanswered state
		for (const mapEntry of lesson.lessonQuestionMap) {
			mapEntry.question.userHasAnsweredCorrectly = undefined
			// Clear any answers and feedback
			if (mapEntry.question.questionType === "FILL_IN_BLANK") {
				mapEntry.question.fillInBlankAnswer = undefined
				mapEntry.question.fillInBlankFeedback = undefined
			} else if (mapEntry.question.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
				mapEntry.question.actionToCodeOpenEndedAnswer = undefined
				mapEntry.question.actionToCodeOpenEndedFeedback = undefined
			}
		}

		// Reset current question state if it's for this lesson
		if (this.currentQuestionState) {
			const currentLesson = Array.from(this.lessonsById.values()).find((l): boolean =>
				l.lessonQuestionMap?.some((q): boolean => q.question.questionId === this.currentQuestionState?.question.questionId) ?? false
			)
			if (currentLesson?.lessonId === lessonId) {
				this.currentQuestionState = null
				this.isInQuestionConfirmationStage = false
				this.lastAnswerWasCorrect = false
			}
		}
	})

	public setIsExitDialogOpen = action((isOpen: boolean): void => {
		this.isExitDialogOpen = isOpen
	})

	public logout(): void {
		this.isRetrievingAllLessons = false
		this.hasRetrievedAllLessons = false
		this.lessonsById = new Map()
		this.currentQuestionState = null
		this.isInQuestionConfirmationStage = false
		this.lastAnswerWasCorrect = false
		this.isExitDialogOpen = false
	}
}

const learnClass = new LearnClass()

export default learnClass
