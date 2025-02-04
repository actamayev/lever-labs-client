import { observer } from "mobx-react"
import isUndefined from "lodash-es/isUndefined"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"
import useAnswerChoiceButtonListener from "../../../hooks/listeners/answer-choice-button-listener"

function AnswerChoiceButton({ index } : {index: AnswerChoiceID}) {
	const labReadingClass = useLabReadingContext()
	const defaultSiteTheme = useDefaultSiteTheme()
	useAnswerChoiceButtonListener()

	const isSelectedOrActiveQuizAttempt = () => {
		if (!labReadingClass.activeQuiz) return false
		const isSelected = labReadingClass.activeQuizDraftAnswer?.answerChoiceId === index
		const activeQuizAttempt = labReadingClass.getActiveQuizAttempt(index)
		return isSelected || activeQuizAttempt
	}

	const getAnswerStyles = () => {
		const baseStyles = "h-auto min-h-16 p-4 text-left rounded-lg border-2 \
        transition-colors bg-inherit text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 \
        whitespace-normal items-center duration-0 text-sm relative" // Added relative for number positioning
		const hasActiveQuizBeenAnswered = labReadingClass.hasActiveQuizBeenAnswered
		if (!hasActiveQuizBeenAnswered && isSelectedOrActiveQuizAttempt()) {
			return cn(baseStyles, "border-pipTheme bg-zinc-100 dark:bg-zinc-900 text-pipTheme")
		}

		if (hasActiveQuizBeenAnswered && isSelectedOrActiveQuizAttempt()) {
			const isCorrect = labReadingClass.getActiveQuizAttempt(index)?.isCorrect
			let isCorrectStyles = "border-pipTheme bg-zinc-100 dark:bg-zinc-900 text-pipTheme dark:text-pipThemeOffWhite"
			if (isCorrect) isCorrectStyles = "border-green-500 bg-green-100 hover:bg-green-200 \
			dark:bg-green-900 dark:hover:bg-green-800 text-black dark:text-white"
			else if (isCorrect === false) isCorrectStyles = "border-red-500 bg-red-100 hover:bg-red-200 \
			dark:bg-red-900 dark:hover:bg-red-800 text-black dark:text-white"

			return cn(baseStyles, isCorrectStyles)
		}

		return cn(baseStyles, "hover:bg-zinc-100 border-zinc-200 dark:hover:bg-zinc-800 dark:border-zinc-700")
	}

	const getNumberStyles = () => {
		const hasActiveQuizBeenAnswered = labReadingClass.hasActiveQuizBeenAnswered

		const baseStyles = "absolute top-2 left-2 w-6 h-6 flex items-center justify-center \
        border-2 rounded-md text-xs font-medium"

		if (isSelectedOrActiveQuizAttempt() && !hasActiveQuizBeenAnswered) {
			return cn(baseStyles, "border-pipTheme text-pipTheme")
		}

		if (hasActiveQuizBeenAnswered && isSelectedOrActiveQuizAttempt()) {
			const isCorrect = labReadingClass.getActiveQuizAttempt(index)?.isCorrect
			let isCorrectStyles = "border-pipTheme text-pipTheme dark:text-pipThemeOffWhite" // before answer is selected
			if (isCorrect) isCorrectStyles = "border-green-500 text-green-700 dark:text-green-300"
			else if (isCorrect === false) isCorrectStyles = "border-red-500 text-red-700 dark:text-red-300"

			return cn(baseStyles, isCorrectStyles)
		}

		return cn(baseStyles, "border-zinc-300 dark:border-zinc-600")
	}

	// eslint-disable-next-line complexity
	const shadowColor = () => {
		if (!labReadingClass.activeQuiz) return ""
		if (defaultSiteTheme === "light") {
			if (!labReadingClass.hasActiveQuizBeenAnswered || !isSelectedOrActiveQuizAttempt()) {
				if (isSelectedOrActiveQuizAttempt()) return "rgb(0, 61, 165)"
				else return "rgb(228, 228, 231)"
			}
			const isCorrect = labReadingClass.getActiveQuizAttempt(index)?.isCorrect
			if (isUndefined(isCorrect)) return "rgb(0, 61, 165)"
			else if (isCorrect === false) return "rgb(239, 68, 68)"
			else return "rgb(34,197,94)"
		} else {
			if (!labReadingClass.hasActiveQuizBeenAnswered || !isSelectedOrActiveQuizAttempt()) {
				if (isSelectedOrActiveQuizAttempt()) return "rgb(0, 61, 165)"
				else return "rgb(63, 63, 70)"
			}
			const isCorrect = labReadingClass.getActiveQuizAttempt(index)?.isCorrect
			if (isUndefined(isCorrect)) return "rgb(0, 61, 165)"
			else if (isCorrect === false) return "rgb(239, 68, 68)"
			else return "rgb(34,197,94)"
		}
	}

	const answerText = labReadingClass.currentQuestion?.choices[(index - 1) as 0 | 1 | 2 | 3].text
	if (!labReadingClass.activeQuiz || !answerText) return null

	return (
		<TactileButton
			onClick={() => labReadingClass.setDraftAnswerChoice(index)}
			className={getAnswerStyles()}
			shadowColor={shadowColor()}
		>
			<span className={getNumberStyles()}>{index}</span>
			<div className="ml-8">{answerText}</div>
		</TactileButton>
	)
}

export default observer(AnswerChoiceButton)
