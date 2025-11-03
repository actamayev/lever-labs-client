"use client"

import { observer } from "mobx-react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { QuestionUUID } from "@lever-labs/common-ts/types/utils"
import learnClass from "../../classes/learn-class"
import OpenEndedQuestion from "./open-ended-question"

function FillInBlankQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const fillInTheBlank = currentQuestionState?.question.fillInTheBlank

	const handleAnswerChange = (questionId: QuestionUUID, blocklyJson: BlocklyJson, cppCode: string): void => {
		learnClass.setFillInBlankAnswer(questionId, blocklyJson, cppCode)
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

