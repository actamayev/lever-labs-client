import { X } from "lucide-react"
import { useCallback } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"

interface QuizSectionProps {
  blocks: ContentBlock[]
  onQuizComplete: (blockId: ContentBlockID) => void
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

	const currentBlock = blocks.find(b => b.id === activeQuiz?.blockId)

	const handleAnswerSelect = useCallback((choiceIndex: number) => {
		setActiveQuiz(prev => {
			if (!prev) return null
			return {
				...prev,
				selectedChoice: choiceIndex,
				showExplanation: true,
			}
		})
	}, [setActiveQuiz])

	const handleNextQuestion = useCallback(() => {
		if (!activeQuiz || !currentBlock || !currentBlock.action.quiz) return

		const isLastQuestion = activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1

		if (isLastQuestion) {
			onQuizComplete(activeQuiz.blockId)
			return
		}

		setActiveQuiz(prev => {
			if (!prev) return null
			return {
				...prev,
				questionIndex: prev.questionIndex + 1,
				selectedChoice: null,
				showExplanation: false,
			}
		})
	}, [activeQuiz, currentBlock, onQuizComplete, setActiveQuiz])

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
				<h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
				<div className="space-y-4">
					{currentQuestion.choices.map((choice, index) => (
						<Button
							key={index}
							onClick={() => handleAnswerSelect(index)}
							disabled={activeQuiz.showExplanation}
							className={cn(
								"w-full p-4 text-left rounded-lg border transition-colors",
								// eslint-disable-next-line no-nested-ternary
								activeQuiz.selectedChoice === index
									? choice.correct
										? "bg-green-100 border-green-500 text-black"
										: "bg-red-100 border-red-500"
									: "hover:bg-gray-100 border-gray-200"
							)}
						>
							{choice.text}
						</Button>
					))}
				</div>
			</div>

			{(activeQuiz.showExplanation || activeQuiz.isReview) && (
				<div className="p-4 border-t border-zinc-300 dark:border-zinc-700">
					{activeQuiz.selectedChoice !== null && (
						<div className={cn(
							"p-4 rounded-lg mb-4",
							currentQuestion.choices[activeQuiz.selectedChoice].correct
								? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
								: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
						)}>
							{currentQuestion.choices[activeQuiz.selectedChoice].explanation ||
			(currentQuestion.choices[activeQuiz.selectedChoice].correct
				? "Correct!"
				: "Incorrect. Try again.")}
						</div>
					)}

					{!activeQuiz.isReview &&
           activeQuiz.selectedChoice !== null &&
           currentQuestion.choices[activeQuiz.selectedChoice]?.correct && (
						<Button
							onClick={handleNextQuestion}
							className="w-full"
						>
							{activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1
								? "Complete Quiz"
								: "Next Question"}
						</Button>
					)}
				</div>
			)}
		</div>
	)
}
