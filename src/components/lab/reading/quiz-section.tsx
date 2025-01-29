/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect, useCallback } from "react"

interface QuizSectionProps {
	blocks: ContentBlock[];
	readingState: ReadingState;
	onQuizComplete: (blockId: string) => void;
}

// eslint-disable-next-line max-lines-per-function
export default function QuizSection (props: QuizSectionProps) {
	const { blocks, readingState, onQuizComplete } = props
	const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz| null>(null)
	const currentBlock = blocks.find(b => b.id === activeQuiz?.blockId)

	// Find the first uncompleted quiz in revealed blocks
	useEffect(() => {
		const uncompleted = blocks.find(block =>
			block.action.type === "quiz" &&
			readingState.revealedBlocks.includes(block.id) &&
			!readingState.completedQuizzes.includes(block.id)
		)

		if (uncompleted && !activeQuiz) {
			setActiveQuiz({
				blockId: uncompleted.id,
				questionIndex: 0,
				selectedChoice: null,
				showExplanation: false,
			})
		}
	}, [blocks, readingState, activeQuiz])


	const handleAnswerSelect = useCallback((choiceIndex: number) => {
		setActiveQuiz(prev => {
			if (!prev) return null
			return {
				...prev,
				selectedChoice: choiceIndex,
				showExplanation: true,
			}
		})
	}, [])

	const handleNextQuestion = useCallback(() => {
		if (!activeQuiz || !currentBlock) return
		const isLastQuestion = activeQuiz.questionIndex === currentBlock.action.quiz!.questions.length - 1

		if (isLastQuestion) {
			onQuizComplete(activeQuiz.blockId)
			setActiveQuiz(null)
		} else {
			setActiveQuiz(prev => {
				if (!prev) return null
				return {
					...prev,
					questionIndex: prev.questionIndex + 1,
					selectedChoice: null,
					showExplanation: false,
				}
			})
		}
	}, [activeQuiz, currentBlock, onQuizComplete])

	if (!activeQuiz || !currentBlock?.action.quiz) return null

	const currentQuestion = currentBlock.action.quiz.questions[activeQuiz.questionIndex]

	return (
		<div className="h-full p-6 flex flex-col">
			<div className="mb-6">
				<h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
				<div className="space-y-4">
					{currentQuestion.choices.map((choice, index) => (
						<button
							key={index}
							onClick={() => handleAnswerSelect(index)}
							disabled={activeQuiz.showExplanation}
							className={`w-full p-4 text-left rounded-lg border transition-colors ${
								// eslint-disable-next-line no-nested-ternary
								activeQuiz.selectedChoice === index
									? choice.correct
										? "bg-green-100 border-green-500"
										: "bg-red-100 border-red-500"
									: "hover:bg-gray-100 border-gray-200"
							}`}
						>
							{choice.text}
						</button>
					))}
				</div>
			</div>

			{activeQuiz.showExplanation && activeQuiz.selectedChoice !== null && (
				<div className="mt-auto">
					<div className={`p-4 rounded-lg mb-4 ${
						currentQuestion.choices[activeQuiz.selectedChoice].correct
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
					}`}>
						{currentQuestion.choices[activeQuiz.selectedChoice].explanation ||
			(currentQuestion.choices[activeQuiz.selectedChoice].correct
				? "Correct!"
				: "Incorrect. Try again.")}
					</div>

					{currentQuestion.choices[activeQuiz.selectedChoice].correct && (
						<button
							onClick={handleNextQuestion}
							className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
						>
							{activeQuiz.questionIndex === currentBlock.action.quiz!.questions.length - 1
								? "Complete Quiz"
								: "Next Question"}
						</button>
					)}
				</div>
			)}
		</div>
	)
}
