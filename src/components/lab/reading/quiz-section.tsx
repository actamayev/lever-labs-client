import { X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"

interface QuizSectionProps {
	blocks: ContentBlock[]
	onQuizComplete: (blockId: ContentBlockID, answers: QuizAnswerAttempt[]) => void
	activeQuiz: ActiveQuiz | null
	setActiveQuiz: React.Dispatch<React.SetStateAction<ActiveQuiz | null>>
}

// eslint-disable-next-line max-lines-per-function, complexity
export default function QuizSection(props: QuizSectionProps) {
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
			setQuizAnswers(activeQuiz.previousAnswers)
		} else {
			setQuizAnswers([])
		}
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
			<div className="p-4 border-b border-zinc-300 dark:border-zinc-700">
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
						<Button
							key={index}
							onClick={() => handleAnswerSelect(index)}
							disabled={activeQuiz.showExplanation}
							className={cn(
								"h-32 p-4 text-left rounded-lg border transition-colors",
								selectedAnswer === index && !activeQuiz.showExplanation && "ring-2 ring-blue-500",
								// eslint-disable-next-line no-nested-ternary
								activeQuiz.showExplanation && selectedAnswer === index
									? currentQuestion.choices[index].correct
										? "bg-green-100 border-green-500 text-black"
										: "bg-red-100 border-red-500"
									: "hover:bg-gray-100 border-gray-200"
							)}
						>
							{currentQuestion.choices[index].text}
						</Button>
					))}
					{[2, 3].map((index) => (
						<Button
							key={index}
							onClick={() => handleAnswerSelect(index)}
							disabled={activeQuiz.showExplanation}
							className={cn(
								"h-32 p-4 text-left rounded-lg border transition-colors",
								selectedAnswer === index && !activeQuiz.showExplanation && "ring-2 ring-blue-500",
								// eslint-disable-next-line no-nested-ternary
								activeQuiz.showExplanation && selectedAnswer === index
									? currentQuestion.choices[index].correct
										? "bg-green-100 border-green-500 text-black"
										: "bg-red-100 border-red-500"
									: "hover:bg-gray-100 border-gray-200"
							)}
						>
							{currentQuestion.choices[index].text}
						</Button>
					))}
				</div>
			</div>

			<div className="p-4 border-t border-zinc-300 dark:border-zinc-700">
				{activeQuiz.showExplanation ? (
					<>
						{selectedAnswer !== null && (
							<div className={cn(
								"p-4 rounded-lg mb-4",
								currentQuestion.choices[selectedAnswer].correct
									? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
									: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
							)}>
								{currentQuestion.choices[selectedAnswer].explanation ||
				(currentQuestion.choices[selectedAnswer].correct
					? "Correct!"
					: "Incorrect. Try again.")}
							</div>
						)}

						{(!activeQuiz.isReview &&
              selectedAnswer !== null &&
              currentQuestion.choices[selectedAnswer]?.correct) ||
              activeQuiz.isReview ? (
								<Button
									onClick={handleNextQuestion}
									className="w-full"
									disabled={activeQuiz.isReview &&
                  activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1}
								>
									{activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1
										? "Complete Quiz"
										: "Next Question"}
								</Button>
							) : null}
					</>
				) : (
					<Button
						onClick={handleCheckAnswer}
						className="w-full"
						disabled={selectedAnswer === null}
					>
            Check Answer
					</Button>
				)}
			</div>
		</div>
	)
}
