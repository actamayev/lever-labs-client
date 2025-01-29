import isNull from "lodash-es/isNull"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"

interface Props {
	activeQuiz: ActiveQuiz
	selectedAnswer: number | null
	handleCheckAnswer: () => void
	currentQuestion: Question
	handleNextQuestion: () => void
	currentBlock: ContentBlock
}

export default function QuizExplanationSection(props: Props) {
	const {
		activeQuiz,
		selectedAnswer,
		handleCheckAnswer,
		currentQuestion,
		handleNextQuestion,
		currentBlock
	} = props

	if (!activeQuiz.showExplanation) {
		return (
			<TactileButton
				onClick={handleCheckAnswer}
				className="w-full h-12 text-xl duration-0 rounded-2xl bg-pipTheme hover:bg-pipThemeHover"
				disabled={isNull(selectedAnswer)}
				shadowHeight={4}
			>
				Check Answer
			</TactileButton>
		)
	}

	function ShowExplanation() {
		if (isNull(selectedAnswer)) return null
		return (
			<div className={cn(
				"p-4 rounded-lg mb-4 text-xl",
				currentQuestion.choices[selectedAnswer].correct
					? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
					: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
			)}>
				{currentQuestion.choices[selectedAnswer].explanation ||
						(currentQuestion.choices[selectedAnswer].correct
							? "Correct!"
							: "Incorrect. Try again.")}
			</div>
		)
	}

	function HandleNextQuestion() {
		// Early returns if quiz interaction is not allowed
		if (!activeQuiz || !currentBlock.action.quiz) return null

		const isReviewMode = activeQuiz.isReview
		const hasSelectedAnswer = selectedAnswer !== null
		const isAnswerCorrect = hasSelectedAnswer && currentQuestion.choices[selectedAnswer]?.correct
		const isLastQuestion = activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1

		// In review mode OR (when not reviewing, must have selected correct answer)
		const shouldShowNextButton = isReviewMode || (hasSelectedAnswer && isAnswerCorrect)
		if (!shouldShowNextButton) return null

		return (
			<TactileButton
				onClick={handleNextQuestion}
				className="w-full h-12 text-xl duration-0 rounded-2xl bg-pipTheme hover:bg-pipThemeHover"
				disabled={isReviewMode && isLastQuestion}
				shadowHeight={4}
			>
				{isLastQuestion ? "Complete Quiz" : "Next Question"}
			</TactileButton>
		)
	}

	return (
		<>
			<ShowExplanation />
			<HandleNextQuestion />
		</>
	)
}
