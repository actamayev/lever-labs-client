import { useMemo } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { TactileButton } from "../../shadcn/ui/tactile-button"

interface Props {
    activeQuiz: ActiveQuiz
    currentQuestion: Question
    index: number
    selectedAnswer: number | null
    handleAnswerSelect: (choiceIndex: number) => void
}

export default function AnswerChoiceButton(props: Props) {
	const { activeQuiz, currentQuestion, index, selectedAnswer, handleAnswerSelect } = props

	const getAnswerStyles = useMemo(() => {
		// Added whitespace-normal and flex-col to allow text wrapping
		const baseStyles = "h-auto min-h-16 p-4 text-left rounded-lg border-2 \
		transition-colors bg-inherit text-black hover:bg-zinc-200 whitespace-normal items-center duration-0"
		const isSelected = selectedAnswer === index
		const isShowingExplanation = activeQuiz.showExplanation

		// When answer is selected but not yet checked
		if (isSelected && !isShowingExplanation) {
			return cn(baseStyles, "ring-2 ring-pipTheme border-none bg-zinc-100 text-pipTheme")
		}

		const isCorrect = currentQuestion.choices[index].correct

		// When showing the explanation and this was the selected answer
		if (isShowingExplanation && isSelected) {
			return cn(
				baseStyles,
				isCorrect
					? "bg-green-100 border-green-500 text-black"
					: "ring-2 ring-pipTheme border-none bg-zinc-100 text-pipTheme"
			)
		}

		// Default state
		return cn(baseStyles, "hover:bg-zinc-100 border-zinc-200")
	}, [activeQuiz, currentQuestion.choices, index, selectedAnswer])

	const shadowColor = useMemo(() => {
		if (!activeQuiz.showExplanation || selectedAnswer !== index) {
			return "rgb(228,228,231)"
		}
		const isCorrect = currentQuestion.choices[index].correct
		if (isCorrect) return "rgb(34,197,94)" // green-500
		else return "rgb(228,228,231"
	}, [activeQuiz.showExplanation, currentQuestion.choices, index, selectedAnswer])

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
