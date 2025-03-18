"use client"

import { observer } from "mobx-react"
import isUndefined from "lodash-es/isUndefined"
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

	const disabled = () => {
		if (labReadingClass.activeQuiz?.questionUUID === question.questionUUID) return false
		if (labReadingClass.quizAttempts.has(question.questionUUID)) return false
		return !labReadingClass.isQuestionInShownBlocks(question.questionUUID)
	}

	const extraClasses = () => {
		if (isUndefined(isCorrect)) {
			return "bg-swan hover:bg-gray-300 focus:bg-gray-300 dark:bg-gray-800 dark:hover-bg-gray-700 dark:focus:bg-gray-700"
		}
		if (isCorrect === false) {
			return "bg-red-200 hover:bg-red-300 focus:bg-red-300 dark:bg-red-800 dark:hover-bg-red-700 dark:focus:bg-red-700"
		}
		return "bg-green-200 hover:bg-green-300 focus:bg-green-300 dark:bg-green-800 dark:hover-bg-green-700 dark:focus:bg-green-700"
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
