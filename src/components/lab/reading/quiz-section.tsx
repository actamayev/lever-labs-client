import { X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { Button } from "../../shadcn/ui/button"
import AnswerChoiceButton from "./answer-choice-button"
import QuizExplanationSection from "./quiz-explanation-section"

interface Props {
	blocks: ContentBlock[]
	onQuizComplete: (blockId: ContentBlockID, answers: QuizAnswerAttempt[]) => void
	activeQuiz: ActiveQuiz | null
	setActiveQuiz: React.Dispatch<React.SetStateAction<ActiveQuiz | null>>
}

// eslint-disable-next-line max-lines-per-function, complexity
export default function QuizSection(props: Props) {
	const {
		blocks,
		onQuizComplete,
		activeQuiz,
		setActiveQuiz
	} = props

	const [quizAnswers, setQuizAnswers] = useState<QuizAnswerAttempt[]>([])
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
	const currentBlock = blocks.find(b => b.id === activeQuiz?.blockId)

	// Initialize answers from previous attempt if reviewing
	useEffect(() => {
		if (activeQuiz?.isReview && activeQuiz.previousAnswers) {
			return setQuizAnswers(activeQuiz.previousAnswers)
		}
		setQuizAnswers([])
	}, [activeQuiz?.isReview, activeQuiz?.previousAnswers])

	const handleAnswerSelect = useCallback((choiceIndex: number) => {
		if (activeQuiz?.showExplanation) return
		setSelectedAnswer(choiceIndex)
	}, [activeQuiz?.showExplanation])

	const handleCheckAnswer = useCallback(() => {
		if (!currentBlock?.action.quiz?.questions[activeQuiz?.questionIndex ?? 0] || selectedAnswer === null) return

		const isCorrect = currentBlock.action.quiz.questions[activeQuiz?.questionIndex ?? 0].choices[selectedAnswer].correct

		setQuizAnswers(prev => {
			const newAnswers = [...prev]
			newAnswers[activeQuiz?.questionIndex ?? 0] = {
				questionIndex: activeQuiz?.questionIndex ?? 0,
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
	}, [activeQuiz?.questionIndex, currentBlock?.action.quiz?.questions, selectedAnswer, setActiveQuiz])

	const handleNextQuestion = useCallback(() => {
		if (!activeQuiz || !currentBlock?.action.quiz) return

		const isLastQuestion = activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1

		if (isLastQuestion) {
			onQuizComplete(activeQuiz.blockId, quizAnswers)
			return
		}

		setActiveQuiz(prev => {
			if (!prev) return null
			return {
				...prev,
				questionIndex: prev.questionIndex + 1,
				selectedChoice: prev.previousAnswers[prev.questionIndex + 1]?.selectedChoice ?? null,
				showExplanation: prev.isReview || false,
			}
		})
		setSelectedAnswer(null)
	}, [activeQuiz, currentBlock?.action.quiz, onQuizComplete, quizAnswers, setActiveQuiz])

	if (!activeQuiz || !currentBlock?.action.quiz) return null

	const currentQuestion = currentBlock.action.quiz.questions[activeQuiz.questionIndex]

	return (
		<div className="h-full flex flex-col">
			<div className="p-4 border-b-2 border-zinc-300 dark:border-zinc-700">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">
						{activeQuiz.isReview ? "Quiz Review" : "Quiz"}
					</h3>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setActiveQuiz(null)}
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-6">
				<h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

				{/* 2x2 Grid Layout for Answer Choices */}
				<div className="grid grid-cols-2 gap-4">
					{[0, 1].map((index) => (
						<AnswerChoiceButton
							activeQuiz={activeQuiz}
							currentQuestion={currentQuestion}
							index={index}
							selectedAnswer={selectedAnswer}
							handleAnswerSelect={handleAnswerSelect}
							key={index}
						/>
					))}
					{[2, 3].map((index) => (
						<AnswerChoiceButton
							activeQuiz={activeQuiz}
							currentQuestion={currentQuestion}
							index={index}
							selectedAnswer={selectedAnswer}
							handleAnswerSelect={handleAnswerSelect}
							key={index}
						/>
					))}
				</div>
			</div>

			<div className="p-4">
				<QuizExplanationSection
					activeQuiz={activeQuiz}
					selectedAnswer={selectedAnswer}
					handleCheckAnswer={handleCheckAnswer}
					currentQuestion={currentQuestion}
					handleNextQuestion={handleNextQuestion}
					currentBlock={currentBlock}
				/>
			</div>
		</div>
	)
}
