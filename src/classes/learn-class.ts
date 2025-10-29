import { action, makeAutoObservable } from "mobx"
import { Lesson } from "@lever-labs/common-ts/types/learn"
import { soundManager } from "./utility/sound-manager-class"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import markLessonComplete from "../utils/learn/mark-lesson-complete"
import stopCareerTrigger from "../utils/career-quest/stop-career-trigger"
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
	public isLessonCompleted = false
	public isNavigatingAway = false

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
				numberQuestionsCorrectFirstTry: 0,
			})
		}
	})

	public setSingleLesson = action((lesson: LocalLesson): void => {
		this.lessonsById.set(lesson.lessonId, {
			...lesson,
			numberQuestionsCorrect: lesson.numberQuestionsCorrect ?? 0,
			numberQuestionsCorrectFirstTry: lesson.numberQuestionsCorrectFirstTry ?? 0
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
	public setQuestionAnsweredCorrectness = action((lessonId: LessonUUID, questionId: string, isCorrect: boolean): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson || !lesson.lessonQuestionMap) return

		let wasCorrect = false
		let wasFirstAttempt = false

		for (const mapEntry of lesson.lessonQuestionMap) {
			if (mapEntry.question.questionId !== questionId) continue

			const q = mapEntry.question
			wasCorrect = q.userHasAnsweredCorrectly === true
			wasFirstAttempt = q.userHasAnsweredCorrectly === undefined

			mapEntry.question.userHasAnsweredCorrectly = isCorrect
			break
		}

		// Update the counter based on the change in correctness
		if (isCorrect && !wasCorrect) {
			lesson.numberQuestionsCorrect += 1
		} else if (!isCorrect && wasCorrect) {
			lesson.numberQuestionsCorrect -= 1
		}

		// Track first-try correct answers
		if (isCorrect && wasFirstAttempt) {
			lesson.numberQuestionsCorrectFirstTry += 1
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
		let wasFirstAttempt = false
		let questionFound = false

		for (const mapEntry of lesson.lessonQuestionMap) {
			if (mapEntry.question.questionId !== questionId) continue
			const q = mapEntry.question
			wasCorrect = q.userHasAnsweredCorrectly === true
			wasFirstAttempt = q.userHasAnsweredCorrectly === undefined
			mapEntry.question.userHasAnsweredCorrectly = isCorrect
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

			// Track first-try correct answers
			if (isCorrect && wasFirstAttempt) {
				lesson.numberQuestionsCorrectFirstTry += 1
			}
		}
	})

	// eslint-disable-next-line complexity
	public setActionToCodeOpenEndedAnsweredCorrectness = action((lessonId: LessonUUID, questionId: string, isCorrect: boolean): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson || !lesson.lessonQuestionMap) return

		let wasCorrect = false
		let wasFirstAttempt = false
		let questionFound = false

		for (const mapEntry of lesson.lessonQuestionMap) {
			if (mapEntry.question.questionId !== questionId) continue
			const q = mapEntry.question
			wasCorrect = q.userHasAnsweredCorrectly === true
			wasFirstAttempt = q.userHasAnsweredCorrectly === undefined
			mapEntry.question.userHasAnsweredCorrectly = isCorrect
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

			// Track first-try correct answers
			if (isCorrect && wasFirstAttempt) {
				lesson.numberQuestionsCorrectFirstTry += 1
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

	// eslint-disable-next-line complexity
	public setCurrentQuestion = action((lessonId: LessonUUID, questionIndex: number): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson?.lessonQuestionMap) return

		const sortedQuestions = [...lesson.lessonQuestionMap].sort((a, b): number => a.order - b.order)

		// Initialize question order if starting fresh or if it doesn't exist
		const questionOrder = this.currentQuestionState?.questionOrder ??
			Array.from({ length: sortedQuestions.length }, (_, i): number => i)
		const currentOrderPosition = this.currentQuestionState?.currentOrderPosition ?? 0
		const originalQuestionCount = this.currentQuestionState?.originalQuestionCount ?? sortedQuestions.length

		// Get the actual question index from the order
		const actualQuestionIndex = questionOrder[currentOrderPosition] ?? questionIndex
		const currentQuestion = sortedQuestions[actualQuestionIndex]

		if (!currentQuestion) return

		this.currentQuestionState = {
			question: currentQuestion.question,
			selectedAnswerId: null,
			currentQuestionIndex: actualQuestionIndex,
			totalQuestions: sortedQuestions.length,
			questionOrder,
			currentOrderPosition,
			originalQuestionCount
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
				question.questionId,
				question.fillInBlankAnswer.cppCode
			)
			isCorrect = result.isCorrect;
			((): void => {
				// Persist feedback on the question for rendering in the footer
				const lesson = this.lessonsById.get(lessonId)
				if (!lesson?.lessonQuestionMap) return
				const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === question.questionId)
				if (!questionMap) return
				questionMap.question.fillInBlankFeedback = result.feedback
			})()
		} else if (question.questionType === "FUNCTION_TO_BLOCK" && question.functionToBlockFlashcard) {
			const result = await submitFunctionToBlockAnswer(question.questionId, selectedAnswerId || 0)
			isCorrect = result.isCorrect
			// Store the correct answer choice ID for display purposes
			if (result.correctAnswerChoiceId) {
				question.correctAnswerChoiceId = result.correctAnswerChoiceId
			}
		} else if (question.questionType === "BLOCK_TO_FUNCTION" && question.blockToFunctionFlashcard) {
			const result = await submitBlockToFunctionAnswer(question.questionId, selectedAnswerId || 0)
			isCorrect = result.isCorrect
			// Store the correct answer choice ID for display purposes
			if (result.correctAnswerChoiceId) {
				question.correctAnswerChoiceId = result.correctAnswerChoiceId
			}
		} else if (question.questionType === "ACTION_TO_CODE_MULTIPLE_CHOICE" && question.actionToCodeMultipleChoice) {
			const result = await submitActionToCodeMultipleChoiceAnswer(question.questionId, selectedAnswerId || 0)
			isCorrect = result.isCorrect
			// Store the correct answer choice ID for display purposes
			if (result.correctAnswerChoiceId) {
				question.correctAnswerChoiceId = result.correctAnswerChoiceId
			}
		} else if (question.questionType === "ACTION_TO_CODE_OPEN_ENDED" && question.actionToCodeOpenEndedAnswer) {
			// For action-to-code-open-ended, submit the CPP code and capture feedback
			const result = await submitActionToCodeOpenEndedAnswer(
				question.questionId,
				question.actionToCodeOpenEndedAnswer.cppCode
			)
			isCorrect = result.isCorrect;
			((): void => {
				// Persist feedback on the question for rendering in the footer
				const lesson = this.lessonsById.get(lessonId)
				if (!lesson?.lessonQuestionMap) return
				const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === question.questionId)
				if (!questionMap) return
				questionMap.question.actionToCodeOpenEndedFeedback = result.feedback
			})()
		}

		// Update the question's correctness in the learn class
		if (question.questionType === "FILL_IN_BLANK") {
			this.setFillInBlankAnsweredCorrectness(lessonId, question.questionId, isCorrect)
		} else if (question.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
			this.setActionToCodeOpenEndedAnsweredCorrectness(lessonId, question.questionId, isCorrect)
		} else {
			this.setQuestionAnsweredCorrectness(lessonId, question.questionId, isCorrect)
		}

		// If answer is incorrect and we have current question state, add to retry queue
		if (!isCorrect && this.currentQuestionState) {
			const { currentQuestionIndex, questionOrder } = this.currentQuestionState
			// Only add to retry queue if this question isn't already scheduled for retry later
			const futureOccurrences = questionOrder.slice(this.currentQuestionState.currentOrderPosition + 1)
			if (!futureOccurrences.includes(currentQuestionIndex)) {
				this.currentQuestionState.questionOrder.push(currentQuestionIndex)
			}
		}

		// Set confirmation stage state
		this.setIsInQuestionConfirmationStage(true)
		this.setLastAnswerWasCorrect(isCorrect)

		return isCorrect
	})

	public continueToNextQuestion = action((lessonId: LessonUUID): void => {
		if (!this.currentQuestionState) return

		const { currentQuestionIndex, question, questionOrder, currentOrderPosition } = this.currentQuestionState

		// Stop any career trigger before moving to next question
		void stopCareerTrigger()

		// If this is a demo question, mark it as correct and increment progress
		if (question.questionType === "DEMO") {
			const lesson = this.lessonsById.get(lessonId)
			if (lesson && question.userHasAnsweredCorrectly !== true) {
				question.userHasAnsweredCorrectly = true
				lesson.numberQuestionsCorrect += 1
			}
		}

		// If question was answered correctly, remove any future occurrences from the order
		if (question.userHasAnsweredCorrectly === true) {
			const newQuestionOrder = [...questionOrder]
			// Remove all future occurrences of this question index (keep current one for now)
			for (let i = currentOrderPosition + 1; i < newQuestionOrder.length; i++) {
				if (newQuestionOrder[i] === currentQuestionIndex) {
					newQuestionOrder.splice(i, 1)
					i-- // Adjust index after removal
				}
			}
			this.currentQuestionState.questionOrder = newQuestionOrder
		}

		// Move to next position in the order
		const nextOrderPosition = currentOrderPosition + 1
		if (nextOrderPosition < this.currentQuestionState.questionOrder.length) {
			this.currentQuestionState.currentOrderPosition = nextOrderPosition
			const nextQuestionIndex = this.currentQuestionState.questionOrder[nextOrderPosition]
			this.setCurrentQuestion(lessonId, nextQuestionIndex)
		} else {
			// Lesson is complete - all questions have been answered
			this.isLessonCompleted = true
			this.currentQuestionState = null
			void markLessonComplete(lessonId)
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
				questionMap.question.fillInBlankFeedback = ""
			} else if (question.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
				questionMap.question.actionToCodeOpenEndedFeedback = ""
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
		lesson.numberQuestionsCorrectFirstTry = 0

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
				this.isLessonCompleted = false
				this.isNavigatingAway = false
			}
		}
	})

	public setIsExitDialogOpen = action((isOpen: boolean): void => {
		this.isExitDialogOpen = isOpen
	})

	public setIsLessonCompleted = action((isCompleted: boolean): void => {
		this.isLessonCompleted = isCompleted
	})

	public setIsNavigatingAway = action((isNavigating: boolean): void => {
		this.isNavigatingAway = isNavigating
	})

	public logout(): void {
		this.isRetrievingAllLessons = false
		this.hasRetrievedAllLessons = false
		this.lessonsById = new Map()
		this.currentQuestionState = null
		this.isInQuestionConfirmationStage = false
		this.lastAnswerWasCorrect = false
		this.isExitDialogOpen = false
		this.isLessonCompleted = false
		this.isNavigatingAway = false
	}
}

const learnClass = new LearnClass()

export default learnClass
