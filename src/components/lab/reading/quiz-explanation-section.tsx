import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface Props {
    activeQuiz: ActiveQuiz
    selectedAnswer: number | null
    handleCheckAnswer: () => void
    currentQuestion: Question
    handleNextQuestion: () => void
    currentBlock: ContentBlock
}

function QuizExplanationSection(props: Props) {
	const {
		activeQuiz,
		selectedAnswer,
		handleCheckAnswer,
		currentQuestion,
		handleNextQuestion,
		currentBlock
	} = props
	const defaultSiteTheme = useDefaultSiteTheme()

	if (!activeQuiz.showExplanation) {
		return (
			<TactileButton
				onClick={handleCheckAnswer}
				className="w-full h-12 text-xl border-2 duration-0 rounded-2xl bg-blue-100 hover:bg-blue-200 border-blue-400 text-blue-800
                dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-800"
				disabled={isNull(selectedAnswer)}
				shadowColor={defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"}
				shadowHeight={4}
			>
                CHECK
			</TactileButton>
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
			<TactileButton
				onClick={handleNextQuestion}
				className="mt-4 w-full h-12 text-xl duration-0 rounded-2xl bg-pipTheme hover:bg-pipThemeHover dark:text-white"
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

export default observer(QuizExplanationSection)
