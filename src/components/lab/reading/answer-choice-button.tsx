import { observer } from "mobx-react"
import { useMemo, useEffect } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
    index: number
    selectedAnswer: AnswerChoiceID | undefined
}

function AnswerChoiceButton(props: Props) {
	const { index, selectedAnswer } = props
	const labReadingClass = useLabReadingContext()
	const defaultSiteTheme = useDefaultSiteTheme()

	// Add keyboard event listener
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const numKey = parseInt(event.key)
			if (numKey >= 1 && numKey <= 4 && !labReadingClass.activeQuiz?.showExplanation) {
				labReadingClass.selectAnswer(numKey - 1)
			}
		}

		window.addEventListener("keydown", handleKeyPress)
		return () => window.removeEventListener("keydown", handleKeyPress)
	}, [labReadingClass])

	const getAnswerStyles = useMemo(() => {
		const baseStyles = "h-auto min-h-16 p-4 text-left rounded-lg border-2 \
        transition-colors bg-inherit text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 \
        whitespace-normal items-center duration-0 text-sm relative" // Added relative for number positioning
		const isSelected = labReadingClass.draftAnswer?.answerChoiceId === index
		const isShowingExplanation = labReadingClass.activeQuiz?.showExplanation

		if (isSelected && !isShowingExplanation) {
			return cn(baseStyles, "border-pipTheme bg-zinc-100 dark:bg-zinc-900 text-pipTheme")
		}

		const isCorrect = labReadingClass.currentQuestion?.choices[index].correct

		if (isShowingExplanation && isSelected) {
			return cn(
				baseStyles,
				isCorrect
					? "bg-green-100 dark:bg-green-900 border-green-500 text-black dark:text-white"
					: "border-pipTheme bg-zinc-100 dark:bg-zinc-900 text-pipTheme dark:text-pipThemeOffWhite"
			)
		}

		return cn(baseStyles, "hover:bg-zinc-100 border-zinc-200 dark:hover:bg-zinc-800 dark:border-zinc-700")
	}, [activeQuiz, currentQuestion.choices, index, selectedAnswer])

	const getNumberStyles = useMemo(() => {
		const isSelected = selectedAnswer === index
		const isShowingExplanation = activeQuiz.showExplanation

		const baseStyles = "absolute top-2 left-2 w-6 h-6 flex items-center justify-center \
        border-2 rounded-md text-xs font-medium"

		if (isSelected && !isShowingExplanation) {
			return cn(baseStyles, "border-pipTheme text-pipTheme")
		}

		if (isShowingExplanation && isSelected) {
			const isCorrect = currentQuestion.choices[index].correct
			return cn(
				baseStyles,
				isCorrect
					? "border-green-500 text-green-700 dark:text-green-300"
					: "border-pipTheme text-pipTheme dark:text-pipThemeOffWhite"
			)
		}

		return cn(baseStyles, "border-zinc-300 dark:border-zinc-600")
	}, [activeQuiz.showExplanation, currentQuestion.choices, index, selectedAnswer])

	const shadowColor = useMemo(() => {
		const isSelected = selectedAnswer === index
		if (defaultSiteTheme === "light") {
			if (!activeQuiz.showExplanation || !isSelected) {
				if (isSelected) return "rgb(0, 61, 165)"
				else return "rgb(228,228,231)"
			}
			const isCorrect = currentQuestion.choices[index].correct
			if (isCorrect) return "rgb(34,197,94)"
			else return "rgb(0, 61, 165)"
		}
		if (!activeQuiz.showExplanation || !isSelected) {
			if (isSelected) return "rgb(0, 61, 165)"
			else return "rgb(63, 63, 70)"
		}
		const isCorrect = currentQuestion.choices[index].correct
		if (isCorrect) return "rgb(34,197,94)"
		else return "rgb(0, 61, 165)"
	}, [activeQuiz.showExplanation, currentQuestion.choices, defaultSiteTheme, index, selectedAnswer])

	return (
		<TactileButton
			onClick={() => handleAnswerSelect(index)}
			disabled={activeQuiz.showExplanation}
			className={getAnswerStyles}
			shadowColor={shadowColor}
		>
			<span className={getNumberStyles}>{index + 1}</span>
			<div className="ml-8">{currentQuestion.choices[index].text}</div>
		</TactileButton>
	)
}

export default observer(AnswerChoiceButton)
