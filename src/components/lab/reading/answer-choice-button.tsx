"use client"

import { observer } from "mobx-react"
import isUndefined from "lodash-es/isUndefined"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"
import useAnswerChoiceButtonListener from "../../../hooks/listeners/answer-choice-button-listener"

// eslint-disable-next-line max-lines-per-function
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
		const baseStyles = "group h-auto min-h-16 p-4 text-left rounded-lg border-2 \
		transition-colors bg-inherit text-eel hover:bg-sidebarButtonHover \
		whitespace-normal items-center duration-0 text-sm relative \
		active:border-selectedSidebarButtonBorder active:bg-standardBackgroundHover active:text-answerText dark:active:text-answerText"
		const hasActiveQuizBeenAnswered = labReadingClass.hasActiveQuizBeenAnswered
		if (!hasActiveQuizBeenAnswered && isSelectedOrActiveQuizAttempt()) {
			return cn(baseStyles, "hover:bg-standardBackgroundHover",
				"bg-standardBackgroundHover text-answerText dark:text-answerText border-selectedSidebarButtonBorder"
			)
		}

		if (hasActiveQuizBeenAnswered && isSelectedOrActiveQuizAttempt()) {
			const isCorrect = labReadingClass.getActiveQuizAttempt(index)?.isCorrect
			let isCorrectStyles = "bg-standardBackgroundHover hover:bg-standardBackgroundHover \
			border-selectedSidebarButtonBorder text-answerText dark:text-answerText"
			if (isCorrect) isCorrectStyles = "border-green-500 bg-green-100 hover:bg-green-200 \
			dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300"
			else if (isCorrect === false) isCorrectStyles = "border-red-500 bg-red-100 hover:bg-red-200 \
			dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300"

			return cn(baseStyles, isCorrectStyles)
		}

		return cn(baseStyles, "hover:bg-hover:bg-sidebarButtonHover border-swan")
	}

	const getNumberStyles = () => {
		const hasActiveQuizBeenAnswered = labReadingClass.hasActiveQuizBeenAnswered

		const baseStyles = "absolute top-2 left-2 w-6 h-6 flex items-center justify-center \
		border-2 rounded-md text-xs font-medium text-hare \
		active:border-selectedSidebarButtonBorder active:text-answerText dark:active:text-answerText"
		if (isSelectedOrActiveQuizAttempt() && !hasActiveQuizBeenAnswered) {
			return cn(baseStyles,
				"border-selectedSidebarButtonBorder dark:text-answerText text-answerText"
			)
		}

		if (hasActiveQuizBeenAnswered && isSelectedOrActiveQuizAttempt()) {
			const isCorrect = labReadingClass.getActiveQuizAttempt(index)?.isCorrect
			let isCorrectStyles = "border-selectedSidebarButtonBorder text-answerText dark:text-answerText" // before answer is selected
			if (isCorrect === true) isCorrectStyles = "border-green-500 text-green-700 dark:text-green-300"
			else if (isCorrect === false) isCorrectStyles = "border-red-500 text-red-700 dark:text-red-300"

			return cn(baseStyles, isCorrectStyles)
		}

		return cn(baseStyles, "border-swan")
	}

	// eslint-disable-next-line complexity
	const shadowColor = () => {
		if (!labReadingClass.activeQuiz) return ""
		if (defaultSiteTheme === "light") {
			if (!labReadingClass.hasActiveQuizBeenAnswered || !isSelectedOrActiveQuizAttempt()) {
				if (isSelectedOrActiveQuizAttempt()) return "rgb(132, 216, 255)"
				else return "rgb(229, 229, 229)"
			}
			const isCorrect = labReadingClass.getActiveQuizAttempt(index)?.isCorrect
			if (isUndefined(isCorrect)) return "rgb(132, 216, 255)"
			else if (isCorrect === false) return "rgb(239, 68, 68)"
			else return "rgb(34,197,94)"
		} else {
			if (!labReadingClass.hasActiveQuizBeenAnswered || !isSelectedOrActiveQuizAttempt()) {
				if (isSelectedOrActiveQuizAttempt()) return "rgb(63, 132, 167)"
				else return "rgb(55, 70, 79)"
			}
			const isCorrect = labReadingClass.getActiveQuizAttempt(index)?.isCorrect
			if (isUndefined(isCorrect)) return "rgb(63, 132, 167)"
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
			<span className={cn(
				getNumberStyles(),
				"group-active:border-selectedSidebarButtonBorder group-active:text-answerText dark:group-active:text-answerText"
			)}>
				{index}
			</span>
			<div className="ml-8">{answerText}</div>
		</TactileButton>
	)
}

export default observer(AnswerChoiceButton)
