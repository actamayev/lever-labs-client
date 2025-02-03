import { useCallback } from "react"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import { DropdownMenuItem } from "../../shadcn/ui/dropdown-menu"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
	question: Question
	blockId: ContentBlockID
}

function QuizListDropdownItem(props: Props) {
	const { question, blockId } = props
	const labReadingClass = useLabReadingContext()

	const isCorrect = labReadingClass.quizAttempts.get(question.questionUUID)?.find(attempt => attempt.isCorrect)?.isCorrect
	const setActiveQuizCallback = useCallback(() => {
		labReadingClass.setActiveQuiz({
			blockId,
			questionUUID: question.questionUUID,
			isCorrect: isCorrect || null,
		})
	}, [blockId, isCorrect, labReadingClass, question.questionUUID])

	const disabled = () => {
		if (labReadingClass.activeQuiz?.questionUUID === question.questionUUID) return false
		if (labReadingClass.quizAttempts.has(question.questionUUID)) return false
		return !labReadingClass.isQuestionInShownBlocks(question.questionUUID)
	}

	const extraClasses = () => {
		if (isCorrect === true) return "bg-green-200 hover:bg-green-300 focus:bg-green-300"
		else if (isCorrect === false) return "bg-red-200 hover:bg-red-300 focus:bg-red-300"
		const currentQuestion = labReadingClass.activeQuiz?.questionUUID === question.questionUUID
		if (currentQuestion) return "bg-blue-200 hover:bg-blue-300 focus:bg-blue-300"
		return "bg-zinc-200 hover:bg-zinc-300 focus:bg-zinc-300"
	}

	return (
		<DropdownMenuItem
			className={cn("cursor-pointer text-2xl py-1", extraClasses())}
			onClick={setActiveQuizCallback}
			disabled={disabled()}
		>
			Quiz #{labReadingClass.getQuestionIndexInAllBlocks(question.questionUUID) + 1}
		</DropdownMenuItem>
	)
}

export default observer(QuizListDropdownItem)
