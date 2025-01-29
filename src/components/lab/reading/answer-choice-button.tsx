import { useMemo } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { observer } from "mobx-react"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface Props {
    activeQuiz: ActiveQuiz
    currentQuestion: Question
    index: number
    selectedAnswer: number | null
    handleAnswerSelect: (choiceIndex: number) => void
}

function AnswerChoiceButton(props: Props) {
	const { activeQuiz, currentQuestion, index, selectedAnswer, handleAnswerSelect } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	const getAnswerStyles = useMemo(() => {
		// Added whitespace-normal and flex-col to allow text wrapping
		const baseStyles = "h-auto min-h-16 p-4 text-left rounded-lg border-2 \
		transition-colors bg-inherit text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 \
		whitespace-normal items-center duration-0 text-sm"
		const isSelected = selectedAnswer === index
		const isShowingExplanation = activeQuiz.showExplanation

		// When answer is selected but not yet checked
		if (isSelected && !isShowingExplanation) {
			return cn(baseStyles, "border-pipTheme bg-zinc-100 dark:bg-zinc-900 text-pipTheme")
		}

		const isCorrect = currentQuestion.choices[index].correct

		// When showing the explanation and this was the selected answer
		if (isShowingExplanation && isSelected) {
			return cn(
				baseStyles,
				isCorrect
					? "bg-green-100 dark:bg-green-900 border-green-500 text-black dark:text-white"
					: "border-pipTheme bg-zinc-100 dark:bg-zinc-900 text-pipTheme dark:text-pipThemeOffWhite"
			)
		}

		// Default state
		return cn(baseStyles, "hover:bg-zinc-100 border-zinc-200 hover:bg-zinc-900 dark:border-zinc-800")
	}, [activeQuiz, currentQuestion.choices, index, selectedAnswer])

	const shadowColor = useMemo(() => {
		const isSelected = selectedAnswer === index
		if (defaultSiteTheme === "light") {
			if (!activeQuiz.showExplanation || !isSelected) {
				if (isSelected) return "rgb(0, 61, 165)" //piptheme
				else return "rgb(228,228,231)" // Zinc
			}
			const isCorrect = currentQuestion.choices[index].correct
			if (isCorrect) return "rgb(34,197,94)" // green-500
			else return "rgb(0, 61, 165)" // PipTheme
		}
		if (!activeQuiz.showExplanation || !isSelected) {
			if (isSelected) return "rgb(0, 61, 165)" //piptheme
			else return "rgb(39, 39, 42)" // Zinc
		}
		const isCorrect = currentQuestion.choices[index].correct
		if (isCorrect) return "rgb(34,197,94)" // green-500
		else return "rgb(0, 61, 165)" // PipTheme
	}, [activeQuiz.showExplanation, currentQuestion.choices, defaultSiteTheme, index, selectedAnswer])

	return (
		<TactileButton
			onClick={() => handleAnswerSelect(index)}
			disabled={activeQuiz.showExplanation}
			className={getAnswerStyles}
			shadowColor={shadowColor}
		>
			{currentQuestion.choices[index].text}
		</TactileButton>
	)
}

export default observer(AnswerChoiceButton)
