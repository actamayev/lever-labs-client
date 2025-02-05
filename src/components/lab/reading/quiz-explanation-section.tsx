import { Check } from "lucide-react"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

function QuizExplanationSection() {
	const labReadingClass = useLabReadingContext()

	const CheckButton = observer(() => {
		if (labReadingClass.activeQuiz?.isCorrect === true) return null
		return (
			<BlueTactileButton
				onClick={() => labReadingClass.checkAnswer()}
				className="w-full h-14 text-xl"
				disabled={isNull(labReadingClass.draftAnswer)}
				shadowHeight={4}
			>
				<Check className="!w-6 !h-6" />
				CHECK
			</BlueTactileButton>
		)
	})

	const ShowExplanation = observer(() => {
		if (
			!labReadingClass.activeQuiz ||
			labReadingClass.explanationBeingShown === null
		) return null
		return (
			<div className={cn(
				"p-4 rounded-lg text-xl mb-4",
				labReadingClass.explanationBeingShown.isCorrect
					? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
					: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
			)}>
				{labReadingClass.explanationBeingShown.explanation}
			</div>
		)
	})

	const HandleNextQuestion = observer(() => {
		if (!labReadingClass.activeBlock?.action.quiz) return null

		const isAnswerCorrect = labReadingClass.activeQuiz?.isCorrect
		const isLastQuestion = labReadingClass.activeBlock.action.quiz.questions.at(-1)?.questionUUID ===
			labReadingClass.activeQuiz?.questionUUID

		if (!isAnswerCorrect) return null

		return (
			<BlueTactileButton
				onClick={labReadingClass.handleNextQuestion}
				className="mt-4 w-full px-6 !py-5 text-xl transition-none border-2 h-14"
				shadowHeight={4}
			>
				{isLastQuestion ? "Complete Quiz" : "Next Question"}
			</BlueTactileButton>
		)
	})

	return (
		<>
			<ShowExplanation />
			<CheckButton />
			<HandleNextQuestion />
		</>
	)
}

export default observer(QuizExplanationSection)
