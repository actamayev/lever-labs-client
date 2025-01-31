import isNil from "lodash-es/isNil"
import { CheckCircle, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Button } from "../../shadcn/ui/button"
import { CustomQuiz } from "../../icons/custom-quiz"
import AnswerChoiceButton from "./answer-choice-button"
import QuizExplanationSection from "./quiz-explanation-section"

interface Props {
    blocks: ContentBlock[]
    activeQuiz: ActiveQuiz | null
    setActiveQuiz: React.Dispatch<React.SetStateAction<ActiveQuiz | null>>
	setReadingState: React.Dispatch<React.SetStateAction<ReadingStateWithAttempts>>
}

// eslint-disable-next-line max-lines-per-function
export default function QuizSection(props: Props) {
	const {
		blocks,
		activeQuiz,
		setActiveQuiz,
		setReadingState
	} = props

	// Store answers for each question separately
	const [quizAnswers, setQuizAnswers] = useState<QuizAnswerAttempt[]>([])
	// Store selected answers for each question index
	const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([])
	const currentBlock = blocks.find(b => b.id === activeQuiz?.blockId)

	// Initialize answers from previous attempt if reviewing
	useEffect(() => {
		if (!activeQuiz?.isReview) {
			setQuizAnswers([])
			setSelectedAnswers([])
			return
		}
		setQuizAnswers(activeQuiz.previousAnswers)
		// Initialize selectedAnswers from previous answers
		const maxIndex = Math.max(...activeQuiz.previousAnswers.map(a => a.questionIndex))
		const initialSelected = Array(maxIndex + 1).fill(null)
		activeQuiz.previousAnswers.forEach(answer => {
			initialSelected[answer.questionIndex] = answer.selectedChoice
		})
		setSelectedAnswers(initialSelected)
	}, [activeQuiz?.isReview, activeQuiz?.previousAnswers])

	const handleAnswerSelect = useCallback((choiceIndex: number) => {
		if (activeQuiz?.showExplanation) return

		setSelectedAnswers(prev => {
			const newAnswers = [...prev]
			newAnswers[activeQuiz?.questionIndex ?? 0] = choiceIndex
			return newAnswers
		})
	}, [activeQuiz?.showExplanation, activeQuiz?.questionIndex])

	const handleCheckAnswer = useCallback(() => {
		if (!currentBlock?.action.quiz?.questions[activeQuiz?.questionIndex ?? 0]) return

		const currentQuestionIndex = activeQuiz?.questionIndex ?? 0
		const selectedAnswer = selectedAnswers[currentQuestionIndex]
		if (isNil(selectedAnswer)) return

		const isCorrect = currentBlock.action.quiz.questions[currentQuestionIndex].choices[selectedAnswer].correct

		setQuizAnswers(prev => {
			const newAnswers = [...prev]
			newAnswers[currentQuestionIndex] = {
				questionIndex: currentQuestionIndex,
				selectedChoice: selectedAnswer,
				isCorrect
			}
			return newAnswers
		})

		setActiveQuiz(prev => {
			if (!prev) return null
			return {
				...prev,
				selectedChoice: selectedAnswer,
				showExplanation: true,
			}
		})
	}, [activeQuiz?.questionIndex, currentBlock?.action.quiz?.questions, selectedAnswers, setActiveQuiz])

	const handleQuizComplete = useCallback((
		blockId: ContentBlockID,
		answers: QuizAnswerAttempt[]
	) => {
		const nextBlock = blocks[blocks.findIndex(b => b.id === blockId) + 1] as ContentBlock | undefined
		if (!nextBlock) return
		setReadingState(prev => ({
			...prev,
			completedQuizzes: [...prev.completedQuizzes, blockId],
			revealedBlocks: [...prev.revealedBlocks, nextBlock.id],
			quizAttempts: [...prev.quizAttempts, { blockId, answers }]
		}))
		setActiveQuiz(null)
	}, [blocks, setActiveQuiz, setReadingState])

	const handleNextQuestion = useCallback(() => {
		if (!activeQuiz || !currentBlock?.action.quiz) return

		const isLastQuestion = activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1

		if (isLastQuestion) {
			return handleQuizComplete(activeQuiz.blockId, quizAnswers)
		}

		const nextQuestionIndex = activeQuiz.questionIndex + 1
		setActiveQuiz(prev => {
			if (!prev) return null
			return {
				...prev,
				questionIndex: nextQuestionIndex,
				selectedChoice: selectedAnswers[nextQuestionIndex] ?? null,
				showExplanation: prev.isReview || false,
			}
		})
	}, [activeQuiz, currentBlock?.action.quiz, handleQuizComplete, quizAnswers, selectedAnswers, setActiveQuiz])

	if (!activeQuiz || !currentBlock?.action.quiz) return null

	const currentQuestion = currentBlock.action.quiz.questions[activeQuiz.questionIndex]

	return (
		<div className="h-full flex flex-col">
			<div className="py-3 px-6 border-b-2 border-zinc-300 dark:border-zinc-700">
				<div className="flex items-center justify-between">
					<h3 className="text-2xl font-semibold flex flex-row items-center gap-4">
						{activeQuiz.isReview ? <CheckCircle /> : <CustomQuiz />}
						{activeQuiz.isReview ? "Quiz Review" : "Quiz"}
					</h3>
					<Button
						variant="ghost"
						size="icon"
						className="!p-5"
						onClick={() => setActiveQuiz(null)}
					>
						<X className="!h-6 !w-6" />
					</Button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-6">
				<h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

				<div className="grid grid-cols-2 gap-4">
					{[0, 1, 2, 3].map((index) => (
						<AnswerChoiceButton
							activeQuiz={activeQuiz}
							currentQuestion={currentQuestion}
							index={index}
							selectedAnswer={selectedAnswers[activeQuiz.questionIndex] ?? null}
							handleAnswerSelect={handleAnswerSelect}
							key={index}
						/>
					))}
				</div>
			</div>

			<div className="p-4">
				<QuizExplanationSection
					activeQuiz={activeQuiz}
					selectedAnswer={selectedAnswers[activeQuiz.questionIndex] ?? null}
					handleCheckAnswer={handleCheckAnswer}
					currentQuestion={currentQuestion}
					handleNextQuestion={handleNextQuestion}
					currentBlock={currentBlock}
				/>
			</div>
		</div>
	)
}
