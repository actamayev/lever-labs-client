import isNull from "lodash-es/isNull"
import { cn } from "../../../lib/shadcn/utils"
import { BlueTactileButton } from "../../tactile-buttons"

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
			<BlueTactileButton
				onClick={handleCheckAnswer}
				className="w-full h-14 text-xl"
				disabled={isNull(selectedAnswer)}
				shadowHeight={4}
			>
                CHECK
			</BlueTactileButton>
		)
	}

	function ShowExplanation() {
		if (isNull(selectedAnswer)) return null
		return (
			<div className={cn(
				"p-4 rounded-lg text-xl",
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
		if (!currentBlock.action.quiz) return null

		const isReviewMode = activeQuiz.isReview
		const hasSelectedAnswer = selectedAnswer !== null
		const isAnswerCorrect = hasSelectedAnswer && currentQuestion.choices[selectedAnswer]?.correct
		const isLastQuestion = activeQuiz.questionIndex === currentBlock.action.quiz.questions.length - 1

		const shouldShowNextButton = isReviewMode || (hasSelectedAnswer && isAnswerCorrect)
		if (!shouldShowNextButton) return null

		return (
			<BlueTactileButton
				onClick={handleNextQuestion}
				disabled={isReviewMode && isLastQuestion}
				className="mt-4 w-full px-6 !py-5 text-xl transition-none border-2 h-14"
				shadowHeight={4}
			>
				{isLastQuestion ? "Complete Quiz" : "Next Question"}
			</BlueTactileButton>
		)
	}

	return (
		<>
			<ShowExplanation />
			<HandleNextQuestion />
		</>
	)
}
