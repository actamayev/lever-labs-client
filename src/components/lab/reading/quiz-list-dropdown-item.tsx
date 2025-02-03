import { isUndefined } from "lodash-es"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import { DropdownMenuItem } from "../../shadcn/ui/dropdown-menu"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
	blockId: ContentBlockID
	question: Question
}

function QuizListDropdownItem(props: Props) {
	const { blockId, question } = props
	const labReadingClass = useLabReadingContext()

	const isCorrect = labReadingClass.quizAttempts.get(question.questionUUID)?.some(attempt => attempt.isCorrect)

	console.log("quiz attempts", question.questionUUID, labReadingClass.quizAttempts.get(question.questionUUID))
	const disabled = () => {
		if (labReadingClass.activeQuiz?.questionUUID === question.questionUUID) return false
		if (labReadingClass.quizAttempts.has(question.questionUUID)) return false
		return !labReadingClass.isQuestionInShownBlocks(question.questionUUID)
	}

	const extraClasses = () => {
		if (isUndefined(isCorrect)) return "bg-zinc-200 hover:bg-zinc-300 focus:bg-zinc-300"
		if (isCorrect === false) return "bg-red-200 hover:bg-red-300 focus:bg-red-300"
		return "bg-green-200 hover:bg-green-300 focus:bg-green-300"
	}

	return (
		<DropdownMenuItem
			className={cn("cursor-pointer text-2xl py-1", extraClasses())}
			onClick={() => labReadingClass.goToSpecificQuestion(question.questionUUID, blockId)}
			disabled={disabled()}
		>
			Quiz #{labReadingClass.getQuestionIndexInAllBlocks(question.questionUUID) + 1}
		</DropdownMenuItem>
	)
}

export default observer(QuizListDropdownItem)
