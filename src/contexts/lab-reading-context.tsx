import { isNull } from "lodash-es"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class LabReadingClass {
	public currentReadingName: Element1Lessons | null = null
	public activeBlocks: ContentBlock[] = [] // All the blocks in the current activity
	public shownBlocks: ContentBlock[] = [] // The blocks that have been shown
	public activeQuiz: ActiveQuiz | null = null
	public draftAnswer: SelectedAnswerDrafts | null = null // consider making this a map (question uuid -> SelectedAnswerDrafts)
	public quizAttempts: Map<QuestionUUID, QuizAnswerAttempt[]> = new Map()
	public quizStyle = { top: "5rem", bottom: "0rem" }

	constructor() {
		makeAutoObservable(this)
	}

	public checkIfBlockIsShown = (blockId: ContentBlockID): boolean => {
		return this.shownBlocks.find(block => block.id === blockId) ? true : false
	}

	public setShownBlocks = action((blockId: ContentBlockID): void => {
		if (this.checkIfBlockIsShown(blockId)) return
		this.shownBlocks.push(this.activeBlocks.find(block => block.id === blockId) as ContentBlock)
	})

	public setBlocks = action((blocks: ContentBlock[], readingName: Element1Lessons): void => {
		if (this.currentReadingName === readingName) return
		this.activeBlocks = blocks
	})

	public getNextBlock(blockId: ContentBlockID): ContentBlock | undefined {
		return this.activeBlocks[this.activeBlocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined
	}

	public setActiveQuiz = action((activeQuiz: ActiveQuiz | null): void => {
		this.activeQuiz = activeQuiz
	})

	public setDraftAnswer = action((draftAnswer: SelectedAnswerDrafts | null): void => {
		this.draftAnswer = draftAnswer
	})

	public setDraftAnswerChoice = action((answerChoiceId: AnswerChoiceID): void => {
		if (!this.activeQuiz) return

		this.setDraftAnswer({
			questionUUID: this.activeQuiz.questionUUID,
			answerChoiceId,
			isCorrect: null
		})
	})

	public setQuizAttempts = action((questionUUID: QuestionUUID, attempt: QuizAnswerAttempt): void => {
		this.quizAttempts.set(questionUUID, [...(this.quizAttempts.get(questionUUID) || []), attempt])
	})

	get readingProgressPercentage(): number {
		const percentage = Math.min(((this.shownBlocks.length - 1) / this.activeBlocks.length) * 100, 100)
		if (percentage !== 100) {
			this.setQuizStyle("5rem", "0rem")
		} else {
			this.setQuizStyle("5rem", "5rem")
		}
		return percentage
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

	public selectAnswer = action((answerChoiceId: AnswerChoiceID): void => {
		if (
			!this.activeBlock ||
			// If this answer has been answered correctly, return
			!this.activeQuiz ||
			this.activeQuiz.isCorrect
		) return
		console.log(answerChoiceId)

		// If the draft answer choice Id and question answer choice Id match, then the answer is correct
		let isCorrect = false
		if (this.currentQuestion?.choices.find(choice => choice.answerChoiceId === this.draftAnswer?.answerChoiceId)) {
			isCorrect = true
		}
		console.log("isCorrect", isCorrect)
		console.log("this.activeQuiz.questionUUID", this.activeQuiz.questionUUID)

		this.setDraftAnswer({
			questionUUID: this.activeQuiz.questionUUID,
			answerChoiceId,
			isCorrect
		})
	})

	private handleQuizComplete = action((blockId: ContentBlockID) => {
		const nextBlock = this.getNextBlock(blockId)
		if (!nextBlock) return

		this.setShownBlocks(nextBlock.id)
		this.setDraftAnswer(null)
	})

	public checkAnswer = action(() => {
		if (!this.activeBlock || !this.draftAnswer || isNull(this.draftAnswer.isCorrect)) return

		const attempt: QuizAnswerAttempt = {
			questionUUID: this.draftAnswer.questionUUID,
			selectedChoice: this.draftAnswer.answerChoiceId,
			isCorrect: this.draftAnswer.isCorrect
		}

		// Add the answer attempt to the quiz attempts
		this.setQuizAttempts(this.draftAnswer.questionUUID, attempt)
	})

	public handleNextQuestion = action(() => {
		if (
			!this.activeBlock ||
			!this.activeBlock.action.quiz ||
			!this.activeQuiz
		) return

		if (this.activeBlock.action.quiz.questions.length === 1) {
			return this.handleQuizComplete(this.activeQuiz.blockId)
		}

		const lastQuestionUUID = this.activeBlock.action.quiz.questions[this.activeBlock.action.quiz.questions.length - 1].questionUUID

		const isLastQuestion = this.activeQuiz.questionUUID === lastQuestionUUID

		if (isLastQuestion) return this.handleQuizComplete(this.activeQuiz.blockId)

		const currentQuestionIndex = this.activeBlock.action.quiz.questions.findIndex(
			question => question.questionUUID === this.activeQuiz?.questionUUID
		)

		const nextQuestionIndex = currentQuestionIndex + 1
		const nextQuestionUUID = this.activeBlock.action.quiz.questions[nextQuestionIndex].questionUUID
		this.setActiveQuiz({
			blockId: this.activeBlock.id,
			questionUUID: nextQuestionUUID,
			isCorrect: null
		})
	})

	public isQuizCorrect(questionId: QuestionUUID): boolean {
		return !!this.quizAttempts.get(questionId)?.find(attempt => attempt.isCorrect)
	}

	public logout() {
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
