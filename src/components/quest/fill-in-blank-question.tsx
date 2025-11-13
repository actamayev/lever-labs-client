"use client"

import { observer } from "mobx-react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { QuestionUUID } from "@lever-labs/common-ts/types/utils"
import questClass from "../../classes/quest-class"
import OpenEndedQuestion from "./open-ended-question"

function FillInBlankQuestion(): React.ReactNode {
	const currentQuestionState = questClass.currentQuestionState
	const fillInTheBlank = currentQuestionState?.question.fillInTheBlank

	const handleAnswerChange = (questionId: QuestionUUID, blocklyJson: BlocklyJson, cppCode: string): void => {
		questClass.setFillInBlankAnswer(questionId, blocklyJson, cppCode)
	}

	if (!fillInTheBlank) {
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					No fill-in-the-blank data available
				</p>
			</div>
		)
	}

	return (
		<OpenEndedQuestion
			questionData={fillInTheBlank}
			onAnswerChange={handleAnswerChange}
			errorMessage="No fill-in-the-blank data available"
		/>
	)
}

export default observer(FillInBlankQuestion)

