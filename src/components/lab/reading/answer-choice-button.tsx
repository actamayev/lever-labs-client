import { useMemo } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"

interface Props {
    activeQuiz: ActiveQuiz | null
    currentQuestion: Question
    index: number
    selectedAnswer: number | null
    handleAnswerSelect: (choiceIndex: number) => void
}

export default function AnswerChoiceButton(props: Props) {
	const { activeQuiz, currentQuestion, index, selectedAnswer, handleAnswerSelect } = props

	const getAnswerStyles = useMemo(() => {
		if (!activeQuiz) return ""
		const baseStyles = "h-16 p-4 text-left rounded-lg border transition-colors bg-inherit text-black hover:bg-zinc-200"
		const isSelected = selectedAnswer === index
		const isShowingExplanation = activeQuiz.showExplanation

		// When answer is selected but not yet checked
		if (isSelected && !isShowingExplanation) {
			return cn(baseStyles, "ring-2 ring-pipTheme border-none bg-zinc-100")
		}

		const isCorrect = currentQuestion.choices[index].correct

		// When showing the explanation and this was the selected answer
		if (isShowingExplanation && isSelected) {
			return cn(
				baseStyles,
				isCorrect
					? "bg-green-100 border-green-500 text-black"
					: "bg-red-100 border-red-500"
			)
		}

		// Default state
		return cn(baseStyles, "hover:bg-zinc-100 border-zinc-200")
	}, [activeQuiz, currentQuestion.choices, index, selectedAnswer])

	if (!activeQuiz) return null

	return (
		<Button
			onClick={() => handleAnswerSelect(index)}
			disabled={activeQuiz.showExplanation}
			className={getAnswerStyles}
			variant="tactile"
		>
			{currentQuestion.choices[index].text}
		</Button>
	)
}
