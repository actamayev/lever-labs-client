import isNil from "lodash-es/isNil"
import isNull from "lodash-es/isNull"
import isUndefined from "lodash-es/isUndefined"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class LabReadingClass {
	public currentReadingName: ReadingNames | null = null
	public activeBlocks: ContentBlock[] = [] // All the blocks in the current activity
	public shownBlocks: ContentBlock[] = [] // The blocks that have been shown
	public activeQuiz: ActiveQuiz | null = null
	public draftAnswer: Map<QuestionUUID, DraftAnswer> = new Map()
	public quizAttempts: Map<QuestionUUID, QuizAnswerAttempt[]> = new Map()
	public quizStyle = { top: "5rem", bottom: "0rem" }
	public explanationBeingShown: ExplanationData | null = null
	public blockHeightStates: Map<ContentBlockID, BlockHeightState> = new Map()

	constructor() {
		makeAutoObservable(this)
	}
	public checkIfBlockIsShown = (blockId: ContentBlockID): boolean => {
		return this.shownBlocks.find(block => block.id === blockId) ? true : false
	}

	public clearShownBlocks = action((): void => {
		this.shownBlocks = []
	})

	public setShownBlocks = action((blockId: ContentBlockID): void => {
		if (this.checkIfBlockIsShown(blockId)) return
		this.shownBlocks.push(this.activeBlocks.find(block => block.id === blockId) as ContentBlock)
	})

	public setBlocks = action((blocks: ContentBlock[], readingName: ReadingNames): void => {
		if (this.currentReadingName === readingName) return
		this.activeBlocks = blocks
		// This is here to clear blocks whenever we go from one reading to another
		const shouldResetShownBlocks = readingName !== this.currentReadingName
		if (shouldResetShownBlocks) this.clearShownBlocks()
		this.currentReadingName = readingName
	})

	public getNextBlock(blockId: ContentBlockID): ContentBlock | undefined {
		return this.activeBlocks[this.activeBlocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined
	}

	public setActiveQuiz = action((activeQuiz: ActiveQuiz | null): void => {
		this.activeQuiz = activeQuiz
	})

	public setDraftAnswer = action((questionUUID: QuestionUUID, draftAnswer: DraftAnswer | null): void => {
		if (isNull(draftAnswer)) {
			this.draftAnswer.delete(questionUUID)
			return
		}
		this.draftAnswer.set(questionUUID, draftAnswer)
	})

	public setExplanationBeingShown = action((explanationData: ExplanationData | null): void => {
		this.explanationBeingShown = explanationData
	})

	public setBlockHeightState = action((blockId: ContentBlockID, state: BlockHeightState) => {
		this.blockHeightStates.set(blockId, state)
	})

	public getBlockHeightState(blockId: ContentBlockID): string {
		const state = this.blockHeightStates.get(blockId)
		switch (state) {
		case "expanded": return "min-h-[calc(80vh)]"
		case "normal": return "min-h-[calc(40vh)]"
		case "minimal": return "min-h-0"
		default: return "min-h-[calc(40vh)]"
		}
	}

	public setDraftAnswerChoice = action((answerChoiceId: AnswerChoiceID): void => {
		if (!this.activeQuiz) return
		//if the question has been answered correctly, don't allow the user to select an answer that's not in quiz attempts
		if (this.activeQuiz.isCorrect) {
			const isAnswerChoiceIDInQuizAttempts = this.quizAttemptsForActiveQuiz.find(
				attempt => attempt.answerChoiceId === answerChoiceId
			)
			if (isUndefined(isAnswerChoiceIDInQuizAttempts)) return
			return this.setExplanationBeingShown({
				questionUUID: this.activeQuiz.questionUUID,
				isCorrect: isAnswerChoiceIDInQuizAttempts.isCorrect,
				explanation: this.getExplanationForQuestion(this.activeQuiz.questionUUID, answerChoiceId)
			})
		}

		let isCorrect = false
		if (this.currentQuestion?.choices.find(choice => choice.answerChoiceId === answerChoiceId)?.correct) {
			isCorrect = true
		}

		this.setDraftAnswer(this.activeQuiz.questionUUID, {
			questionUUID: this.activeQuiz.questionUUID,
			answerChoiceId,
			isCorrect
		})
	})

	public setQuizAttempts = action((questionUUID: QuestionUUID, attempt: QuizAnswerAttempt): void => {
		this.quizAttempts.set(questionUUID, [...(this.quizAttempts.get(questionUUID) || []), attempt])
	})

	get readingProgressPercentage(): number {
		if (this.shownBlocks.length === 1) return 0

		const percentage = ((this.shownBlocks.length - 1) / (this.activeBlocks.length - 1)) * 100

		if (percentage < 100) this.setQuizStyle("5rem", "0rem")
		else this.setQuizStyle("5rem", "5rem")
		return percentage
	}

	get activeQuizDraftAnswer(): DraftAnswer | undefined {
		return this.draftAnswer.get(this.activeQuiz?.questionUUID || "" as QuestionUUID)
	}

	private setQuizStyle = action((top: string, bottom: string) => {
		this.quizStyle = { top, bottom }
	})

	public get activeBlock(): ContentBlock | undefined {
		return this.activeBlocks.find(block => block.id === this.activeQuiz?.blockId)
	}

	public get hasActiveQuizBeenAnswered(): boolean {
		return !!this.quizAttempts.get(this.activeQuiz?.questionUUID || "" as QuestionUUID)
	}

	public get currentQuestion(): Question | undefined {
		return this.activeBlock?.action.quiz?.questions.find(question => question.questionUUID === this.activeQuiz?.questionUUID)
	}

	get currentQuestionDraftAnswer(): DraftAnswer | undefined {
		return this.draftAnswer.get(this.activeQuiz?.questionUUID || "" as QuestionUUID)
	}

	public checkAnswer = action(() => {
		if (
			isUndefined(this.activeBlock) ||
			isNull(this.activeQuiz)
		) return
		const currentQuestionDraftAnswer = this.currentQuestionDraftAnswer
		if (
			isUndefined(currentQuestionDraftAnswer) ||
			isNull(currentQuestionDraftAnswer.isCorrect)
		) return

		// Add the answer attempt to the quiz attempts
		this.setQuizAttempts(currentQuestionDraftAnswer.questionUUID, currentQuestionDraftAnswer as QuizAnswerAttempt)
		this.setActiveQuiz({
			blockId: this.activeQuiz.blockId,
			questionUUID: this.activeQuiz.questionUUID,
			isCorrect: currentQuestionDraftAnswer.isCorrect
		})
		this.setExplanationBeingShown({
			questionUUID: currentQuestionDraftAnswer.questionUUID,
			isCorrect: currentQuestionDraftAnswer.isCorrect,
			explanation: this.getExplanationForQuestion(currentQuestionDraftAnswer.questionUUID)
		})
	})

	private handleQuizComplete = action((blockId: ContentBlockID) => {
		this.setActiveQuiz(null)
		this.setExplanationBeingShown(null)
		const nextBlock = this.getNextBlock(blockId)
		if (!nextBlock) return

		this.scrollToNextBlock(blockId)
	})

	public handleDemoComplete = action((blockId: ContentBlockID) => {
		const nextBlock = this.getNextBlock(blockId)
		if (!nextBlock) return

		this.scrollToNextBlock(blockId)
	})

	public handleNextQuestion = action(() => {
		if (
			!this.activeBlock ||
			!this.activeBlock.action.quiz ||
			!this.activeQuiz
		) return

		// If there's only one question, handle as before
		if (this.activeBlock.action.quiz.questions.length === 1) {
			return this.handleQuizComplete(this.activeQuiz.blockId)
		}

		const questions = this.activeBlock.action.quiz.questions

		// Check if there are any unanswered questions before the current one
		const firstUnansweredIndex = questions.findIndex(question =>
			!this.quizAttempts.get(question.questionUUID)?.some(attempt => attempt.isCorrect)
		)

		const isLastQuestion = this.activeQuiz.questionUUID === questions[questions.length - 1].questionUUID

		// If we're on the last question and there are earlier unanswered questions
		if (isLastQuestion) {
			if (firstUnansweredIndex !== -1 && firstUnansweredIndex < questions.length - 1) {
				// Go back to the first unanswered question
				const nextQuestionUUID = questions[firstUnansweredIndex].questionUUID
				// this.setDraftAnswer(null)
				return this.setActiveQuiz({
					blockId: this.activeBlock.id,
					questionUUID: nextQuestionUUID,
					isCorrect: null,
				})
			}

			// If no unanswered questions remain, complete the quiz
			return this.handleQuizComplete(this.activeQuiz.blockId)
		}

		// Normal flow for moving to next question
		const currentQuestionIndex = questions.findIndex(
			question => question.questionUUID === this.activeQuiz?.questionUUID
		)

		const nextQuestionIndex = currentQuestionIndex + 1
		const nextQuestionUUID = questions[nextQuestionIndex].questionUUID
		const quizAttempts = this.quizAttempts.get(questions[nextQuestionIndex].questionUUID)

		// this.setDraftAnswer(null)
		this.setExplanationBeingShown(null)
		if (isNil(quizAttempts)) {
			return this.setActiveQuiz({
				blockId: this.activeBlock.id,
				questionUUID: nextQuestionUUID,
				isCorrect: null,
			})
		}

		const isCorrect = quizAttempts.find(attempt => attempt.isCorrect)
		this.setActiveQuiz({
			blockId: this.activeBlock.id,
			questionUUID: nextQuestionUUID,
			isCorrect: isCorrect?.isCorrect || null,
		})
	})

	public goToSpecificQuestion = action((questionUUID: QuestionUUID, blockId: ContentBlockID) => {
		if (
			!this.activeBlock ||
			!this.activeBlock.action.quiz ||
			!this.activeQuiz
		) return
		const quizAttempts = this.quizAttempts.get(questionUUID)
		this.setDraftAnswer(questionUUID, null)
		if (isNil(quizAttempts)) {
			this.setExplanationBeingShown(null)
			return this.setActiveQuiz({
				blockId: blockId,
				questionUUID,
				isCorrect: null,
			})
		}
		const isQuizAlreadyOpen = this.activeQuiz.questionUUID === questionUUID
		if (isQuizAlreadyOpen) return
		const quizAttempt = quizAttempts.find(attempt => attempt.isCorrect)
		this.setActiveQuiz({
			blockId: blockId,
			questionUUID,
			isCorrect: quizAttempt?.isCorrect || null,
		})
		this.setExplanationBeingShown({
			questionUUID,
			isCorrect: quizAttempt?.isCorrect || false,
			explanation: this.getExplanationForQuestion(questionUUID, quizAttempt?.answerChoiceId)
		})
	})

	public isQuizCorrect(questionId: QuestionUUID): boolean {
		return !!this.quizAttempts.get(questionId)?.find(attempt => attempt.isCorrect)
	}

	public areQuizesInBlockCorrect(blockId: ContentBlockID): boolean {
		const questions = this.activeBlocks.find(block => block.id === blockId)?.action.quiz?.questions
		if (!questions) return false

		return questions.every(question => this.isQuizCorrect(question.questionUUID))
	}

	public openQuiz = action((block: ContentBlock) => {
		if (!block.action.quiz) return
		// if the block's questions have been answered (from quizAttempts, need to relefct that when setting active quiz)
		const quizAttempts = this.quizAttempts.get(block.action.quiz.questions[0].questionUUID)
		if (isNil(quizAttempts)) {
			this.setExplanationBeingShown(null)
			return this.setActiveQuiz({
				blockId: block.id,
				questionUUID: block.action.quiz.questions[0].questionUUID,
				isCorrect: null,
			})
		}
		const isQuizAlreadyOpen = this.activeQuiz?.questionUUID === block.action.quiz.questions[0].questionUUID
		if (isQuizAlreadyOpen) return
		const isCorrect = quizAttempts.find(attempt => attempt.isCorrect)
		this.setActiveQuiz({
			blockId: block.id,
			questionUUID: block.action.quiz.questions[0].questionUUID,
			isCorrect: isCorrect?.isCorrect || null,
		})
		this.setExplanationBeingShown({
			questionUUID: block.action.quiz.questions[0].questionUUID,
			isCorrect: isCorrect?.isCorrect || false,
			explanation: this.getExplanationForQuestion(block.action.quiz.questions[0].questionUUID, isCorrect?.answerChoiceId)
		})
	})

	private scrollToNextBlock = action((blockId: ContentBlockID) => {
		const nextBlock = this.getNextBlock(blockId)
		if (!nextBlock) return

		// Update height states before showing next block
		if (this.isLastBlockOfActiveBlocks(blockId)) {
			this.setBlockHeightState(blockId, "minimal")
		} else {
			this.setBlockHeightState(blockId, "normal")
		}
		this.setBlockHeightState(nextBlock.id, "expanded")

		this.setShownBlocks(nextBlock.id)

		requestAnimationFrame(() => {
			const nextElement = document.getElementById(`block-${nextBlock.id}`)
			if (!nextElement) return
			const container = nextElement.closest(".reading-content-container")
			if (!container) return

			container.scrollTo({
				top: nextElement.offsetTop,
				behavior: "smooth"
			})
		})
	})

	public handleContinue = action((
		blockId: ContentBlockID,
		setIsContinued: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		setIsContinued(true)
		this.scrollToNextBlock(blockId)
	})

	get quizAttemptsForActiveQuiz (): QuizAnswerAttempt[] {
		return this.quizAttempts.get(this.activeQuiz?.questionUUID || "" as QuestionUUID) || []
	}

	public getActiveQuizAttempt (answerIndex: AnswerChoiceID): QuizAnswerAttempt | undefined {
		const attempts = this.quizAttemptsForActiveQuiz
		return attempts.find(_attempt => _attempt.answerChoiceId === answerIndex)
	}

	public getQuestionIndexInAllBlocks(questionUUID: QuestionUUID): number {
		// Initialize index counter for all questions across blocks
		let totalQuestionIndex = 0

		// Iterate through all active blocks
		for (const block of this.activeBlocks) {
			// Skip if block has no quiz or no questions
			if (!block.action.quiz?.questions) {
				continue
			}

			// Check if the current block contains our target question
			const questionIndex = block.action.quiz.questions.findIndex(
				question => question.questionUUID === questionUUID
			)

			if (questionIndex !== -1) {
				// Found the question - return current total plus position in current block
				return totalQuestionIndex + questionIndex
			}

			// Add number of questions in this block to running total
			totalQuestionIndex += block.action.quiz.questions.length
		}

		// Return -1 if question UUID not found
		return -1
	}

	public isQuestionInShownBlocks(questionUUID: QuestionUUID): boolean {
		return this.shownBlocks.some(block => {
			if (!block.action.quiz?.questions) {
				return false
			}

			return block.action.quiz.questions.some(question => question.questionUUID === questionUUID)
		})
	}

	public getExplanationForQuestion(questionUUID: QuestionUUID, answerChoiceId?: AnswerChoiceID): string {
		if (!answerChoiceId) {
			answerChoiceId = this.draftAnswer.get(questionUUID)?.answerChoiceId
		}
		const question = this.activeBlocks
			.flatMap(block => block.action.quiz?.questions || [])
			.find(_question => _question.questionUUID === questionUUID)

		if (!question) return ""

		const answer = question.choices.find(choice => choice.answerChoiceId === answerChoiceId)

		if (!answer || !answer.explanation) return ""

		return answer.explanation
	}

	public isBlockLastShown(blockId: ContentBlockID): boolean {
		const lastBlock = this.shownBlocks[this.shownBlocks.length - 1]
		return lastBlock.id === blockId
	}

	public isLastBlockOfActiveBlocks(blockId: ContentBlockID): boolean {
		const lastBlock = this.activeBlocks[this.activeBlocks.length - 1]
		return lastBlock.id === blockId
	}

	public logout() {
		this.currentReadingName = null
		this.activeBlocks = []
		this.shownBlocks = []
		this.activeQuiz = null
		this.draftAnswer.clear()
		this.quizAttempts.clear()
		this.explanationBeingShown = null
		this.blockHeightStates.clear()
	}
}

const LabReadingContext = createContext(new LabReadingClass())

export default function LabReadingProvider ({ children }: { children: React.ReactNode }) {
	const labReadingClass = useMemo(() => new LabReadingClass(), [])

	return (
		<LabReadingContext.Provider value={labReadingClass}>
			{children}
		</LabReadingContext.Provider>
	)
}

export const useLabReadingContext = () => useContext(LabReadingContext)
