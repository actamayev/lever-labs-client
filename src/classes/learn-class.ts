import { isNull } from "lodash-es"
import { action, makeAutoObservable, runInAction } from "mobx"
import { Lesson } from "@lever-labs/common-ts/types/learn"
import { LessonUUID, QuestionUUID } from "@lever-labs/common-ts/types/utils"
import { soundManager } from "./utility/sound-manager-class"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import markLessonComplete from "../utils/learn/mark-lesson-complete"
import submitMatchingAnswer from "../utils/learn/submit-matching-answer"
import submitFillInBlankAnswer from "../utils/learn/submit-fill-in-blank-answer"
import stopCurrentlyRunningCode from "../utils/sandbox/stop-currently-running-code"
import submitFunctionToBlockAnswer from "../utils/learn/submit-function-to-block-answer"
import submitBlockToFunctionAnswer from "../utils/learn/submit-block-to-function-answer"
import submitActionToCodeOpenEndedAnswer from "../utils/learn/submit-action-to-code-open-ended-answer"
import submitActionToCodeMultipleChoiceAnswer from "../utils/learn/submit-action-to-code-multiple-choice-answer"

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
	public lastSentCppCodeByQuestionId: Map<QuestionUUID, string> = new Map()

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
	public setQuestionAnsweredCorrectness = action((lessonId: LessonUUID, questionId: QuestionUUID, isCorrect: boolean): void => {
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

	// eslint-disable-next-line complexity
	public setFillInBlankAnsweredCorrectness = action((lessonId: LessonUUID, questionId: QuestionUUID, isCorrect: boolean): void => {
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


	public setActionToCodeOpenEndedAnsweredCorrectness = action((
		lessonId: LessonUUID,
		questionId: QuestionUUID,
		isCorrect: boolean
	// eslint-disable-next-line complexity
	): void => {
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

	public setFillInBlankAnswer = action((questionId: QuestionUUID, blocklyJson: BlocklyJson, cppCode: string): void => {
		// Find the question in the current lesson and store the answer
		const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)

		if (!lesson?.lessonQuestionMap) return

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) return

		questionMap.question.fillInBlankAnswer = {
			initialJson: questionMap.question.fillInTheBlank?.initialBlocklyJson as BlocklyJson,
			blocklyJson,
			cppCode
		}

		// Clear last sent code if the code has changed
		const lastSentCode = this.lastSentCppCodeByQuestionId.get(questionId)
		if (lastSentCode !== cppCode) {
			this.lastSentCppCodeByQuestionId.delete(questionId)
		}
	})

	public setActionToCodeOpenEndedAnswer = action((questionId: QuestionUUID, blocklyJson: BlocklyJson, cppCode: string): void => {
		// Find the question in the current lesson and store the answer
		const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)

		if (!lesson?.lessonQuestionMap) return

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) return

		questionMap.question.actionToCodeOpenEndedAnswer = {
			initialJson: questionMap.question.actionToCodeOpenEnded?.initialBlocklyJson as BlocklyJson,
			blocklyJson,
			cppCode
		}

		// Clear last sent code if the code has changed
		const lastSentCode = this.lastSentCppCodeByQuestionId.get(questionId)
		if (lastSentCode !== cppCode) {
			this.lastSentCppCodeByQuestionId.delete(questionId)
		}
	})

	// eslint-disable-next-line complexity
	public checkCurrentAnswer = action(async (lessonId: LessonUUID): Promise<boolean> => {
		if (!this.currentQuestionState) return false

		const { question, selectedAnswerId } = this.currentQuestionState
		let isCorrect = false

		if (question.questionType === "FILL_IN_BLANK" && question.fillInBlankAnswer) {
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

	private submitMatchingPair = action((
		lessonId: LessonUUID,
		questionId: QuestionUUID,
		codingBlockId: number,
		matchingAnswerChoiceTextId: number
	// eslint-disable-next-line complexity
	): boolean => {
		if (!this.currentQuestionState) return false

		const lesson = this.lessonsById.get(lessonId)
		if (!lesson?.lessonQuestionMap) return false

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) return false

		const question = questionMap.question

		// Initialize matching answer state if it doesn't exist
		if (!question.matchingAnswerState) {
			question.matchingAnswerState = {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}

		// Submit the match to the backend (returns instantly, API call happens in background)
		const isCorrect = submitMatchingAnswer(questionId, codingBlockId, matchingAnswerChoiceTextId)

		// Store the match result
		const matchKey = `${codingBlockId}-${matchingAnswerChoiceTextId}`
		question.matchingAnswerState.matchResults[matchKey] = isCorrect

		// Clear selections after submission (user can make another match)
		question.matchingAnswerState.selectedCodingBlockId = null
		question.matchingAnswerState.selectedMatchingAnswerId = null

		// If correct, add to the correctly matched lists
		if (isCorrect) {
			if (!question.matchingAnswerState.correctlyMatchedBlockIds.includes(codingBlockId)) {
				question.matchingAnswerState.correctlyMatchedBlockIds.push(codingBlockId)
			}
			if (!question.matchingAnswerState.correctlyMatchedChoiceIds.includes(matchingAnswerChoiceTextId)) {
				question.matchingAnswerState.correctlyMatchedChoiceIds.push(matchingAnswerChoiceTextId)
			}
		}

		// Check if all matches are complete
		const allMatchesComplete = this.areAllMatchingPairsComplete(questionId)
		if (allMatchesComplete) {
			// Only mark question as complete when all pairs are correctly matched
			this.setQuestionAnsweredCorrectness(lessonId, questionId, true)
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

		// Don't set confirmation stage - allow user to continue matching
		// Only set confirmation stage when all matches are complete
		if (allMatchesComplete) {
			this.setIsInQuestionConfirmationStage(true)
			this.setLastAnswerWasCorrect(true)
		}

		return isCorrect
	})

	private areAllMatchingPairsComplete = (questionId: QuestionUUID): boolean => {
		const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)
		if (!lesson?.lessonQuestionMap) return false

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap?.question.matching) return false

		const matchingData = questionMap.question.matching
		const matchingPairs = matchingData.matchingAnswerChoice
		const matchingState = questionMap.question.matchingAnswerState

		// If no state exists, definitely not complete
		if (!matchingState) return false

		// Check if all pairs have been correctly matched
		return matchingPairs.every((pair): boolean => {
			const matchKey = `${pair.codingBlock.codingBlockId}-${pair.matchingAnswerChoiceText.matchingAnswerChoiceTextId}`
			return matchingState.matchResults[matchKey] === true
		})
	}

	private setMatchingSelectedCodingBlock = action((lessonId: LessonUUID, questionId: QuestionUUID, codingBlockId: number): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson?.lessonQuestionMap) return

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) return

		const question = questionMap.question

		// Initialize matching answer state if it doesn't exist
		if (!question.matchingAnswerState) {
			question.matchingAnswerState = {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}

		question.matchingAnswerState.selectedCodingBlockId = codingBlockId
	})

	private setMatchingSelectedAnswerChoice = action((
		lessonId: LessonUUID,
		questionId: QuestionUUID,
		matchingAnswerChoiceTextId: number
	): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson?.lessonQuestionMap) return

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) return

		const question = questionMap.question

		// Initialize matching answer state if it doesn't exist
		if (!question.matchingAnswerState) {
			question.matchingAnswerState = {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}

		question.matchingAnswerState.selectedMatchingAnswerId = matchingAnswerChoiceTextId
	})

	public clearMatchingSelections = action((lessonId: LessonUUID, questionId: QuestionUUID): void => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson?.lessonQuestionMap) return

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) return

		const question = questionMap.question

		// Initialize matching answer state if it doesn't exist
		if (!question.matchingAnswerState) {
			question.matchingAnswerState = {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}

		question.matchingAnswerState.selectedCodingBlockId = null
		question.matchingAnswerState.selectedMatchingAnswerId = null
	})

	public getMatchingAnswerState = (questionId: QuestionUUID): {
		selectedCodingBlockId: number | null
		selectedMatchingAnswerId: number | null
		matchResults: Record<string, boolean>
		correctlyMatchedBlockIds: number[]
		correctlyMatchedChoiceIds: number[]
		shuffledCodingBlocks?: MatchingCodingBlock[]
		shuffledMatchingChoices?: MatchingTextChoice[]
	} => {
		const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)
		if (!lesson?.lessonQuestionMap) {
			return {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}

		const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
		if (!questionMap) {
			return {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}

		if (!questionMap.question.matchingAnswerState) {
			// Initialize with default values if it doesn't exist
			questionMap.question.matchingAnswerState = {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: []
			}
		}

		return questionMap.question.matchingAnswerState
	}

	public getMatchingMatchResult = (questionId: QuestionUUID, codingBlockId: number, matchingAnswerId: number): boolean | undefined => {
		const matchingState = this.getMatchingAnswerState(questionId)
		const matchKey = `${codingBlockId}-${matchingAnswerId}`
		return matchingState.matchResults[matchKey]
	}

	public isMatchingBlockMatched = (questionId: QuestionUUID, codingBlockId: number): boolean => {
		const matchingState = this.getMatchingAnswerState(questionId)
		return matchingState.correctlyMatchedBlockIds.includes(codingBlockId)
	}

	public isMatchingChoiceMatched = (questionId: QuestionUUID, matchingAnswerId: number): boolean => {
		const matchingState = this.getMatchingAnswerState(questionId)
		return matchingState.correctlyMatchedChoiceIds.includes(matchingAnswerId)
	}

	public isMatchingBlockSelected = (questionId: QuestionUUID, codingBlockId: number): boolean => {
		const matchingState = this.getMatchingAnswerState(questionId)
		return matchingState.selectedCodingBlockId === codingBlockId
	}

	public isMatchingAnswerChoiceSelected = (questionId: QuestionUUID, matchingAnswerId: number): boolean => {
		const matchingState = this.getMatchingAnswerState(questionId)
		return matchingState.selectedMatchingAnswerId === matchingAnswerId
	}

	public handleMatchingCodingBlockClick = action((questionId: QuestionUUID, codingBlockId: number): void => {
		if (
			this.isInQuestionConfirmationStage ||
			this.isMatchingBlockMatched(questionId, codingBlockId)
		) return

		const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)

		if (!lesson) return

		const matchingState = this.getMatchingAnswerState(questionId)
		const selectedMatchingAnswerId = matchingState.selectedMatchingAnswerId

		if (isNull(selectedMatchingAnswerId)) {
			// Just select the coding block
			return this.setMatchingSelectedCodingBlock(
				lesson.lessonId,
				questionId,
				codingBlockId
			)
		}
		// Both sides selected - submit the match
		this.submitMatchingPair(
			lesson.lessonId,
			questionId,
			codingBlockId,
			selectedMatchingAnswerId
		)
	})

	public handleMatchingChoiceClick = action((questionId: QuestionUUID, matchingAnswerChoiceTextId: number): void => {
		if (
			this.isInQuestionConfirmationStage ||
			this.isMatchingChoiceMatched(questionId, matchingAnswerChoiceTextId)
		) return

		const lesson = Array.from(this.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)

		if (!lesson) return

		const matchingState = this.getMatchingAnswerState(questionId)
		const selectedCodingBlockId = matchingState.selectedCodingBlockId

		if (isNull(selectedCodingBlockId)) {
			// Just select the matching answer choice
			return this.setMatchingSelectedAnswerChoice(
				lesson.lessonId,
				questionId,
				matchingAnswerChoiceTextId
			)
		}
		// Both sides selected - submit the match
		this.submitMatchingPair(
			lesson.lessonId,
			questionId,
			selectedCodingBlockId,
			matchingAnswerChoiceTextId
		)
	})

	public continueToNextQuestion = action(async (lessonId: LessonUUID): Promise<void> => {
		if (!this.currentQuestionState) return
		await stopCurrentlyRunningCode(true)

		runInAction((): void => {
			if (!this.currentQuestionState) return
			const { currentQuestionIndex, question, questionOrder, currentOrderPosition } = this.currentQuestionState

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
	})

	public retryCurrentQuestion = action((): void => {
		// Exit confirmation stage without advancing; allow user to try again
		this.isInQuestionConfirmationStage = false
		this.lastAnswerWasCorrect = false
		this.setSelectedAnswer(null)
		// Clear any previous feedback when retrying
		if (!this.currentQuestionState) return
		const { question } = this.currentQuestionState
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
		} else if (question.questionType === "MATCHING" && questionMap.question.matchingAnswerState) {
			// Clear selections but keep match results and correctly matched lists
			questionMap.question.matchingAnswerState.selectedCodingBlockId = null
			questionMap.question.matchingAnswerState.selectedMatchingAnswerId = null
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
			} else if (mapEntry.question.questionType === "MATCHING") {
				// Clear matching answer state
				mapEntry.question.matchingAnswerState = undefined
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

	public recordCodeSent = action((questionId: QuestionUUID, cppCode: string): void => {
		this.lastSentCppCodeByQuestionId.set(questionId, cppCode)
	})

	public hasCodeBeenSentForCurrentQuestion = (): boolean => {
		if (!this.currentQuestionState) return false
		const questionId = this.currentQuestionState.question.questionId
		const currentQuestion = this.currentQuestionState.question

		let currentCppCode = ""
		if (currentQuestion.questionType === "FILL_IN_BLANK") {
			currentCppCode = currentQuestion.fillInBlankAnswer?.cppCode || ""
		} else if (currentQuestion.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
			currentCppCode = currentQuestion.actionToCodeOpenEndedAnswer?.cppCode || ""
		}

		if (!currentCppCode) return false

		const lastSentCode = this.lastSentCppCodeByQuestionId.get(questionId)
		return lastSentCode === currentCppCode
	}

	private hasMatchingQuestionPartialProgress = (lessonId: LessonUUID): boolean => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson?.lessonQuestionMap) return false

		// Check if any matching question has at least one correct match
		return lesson.lessonQuestionMap.some((questionMap): boolean => {
			const question = questionMap.question
			if (question.questionType !== "MATCHING" || !question.matchingAnswerState) {
				return false
			}

			const matchingState = question.matchingAnswerState
			// Check if there's at least one correctly matched block
			return matchingState.correctlyMatchedBlockIds.length > 0 ||
				// Or check if there's any true value in matchResults
				Object.values(matchingState.matchResults).some((result): boolean => result === true)
		})
	}

	public hasLessonProgress = (lessonId: LessonUUID): boolean => {
		const lesson = this.lessonsById.get(lessonId)
		if (!lesson) return false

		// Check if there are any correctly answered questions
		if (lesson.numberQuestionsCorrect > 0) return true

		// Check if there's partial progress in matching questions
		return this.hasMatchingQuestionPartialProgress(lessonId)
	}

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
		this.lastSentCppCodeByQuestionId = new Map()
	}
}

const learnClass = new LearnClass()

export default learnClass
