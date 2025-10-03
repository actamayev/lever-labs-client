
"use client"

import { observer } from "mobx-react"
import learnClass from "../../classes/learn-class"
import FunctionToBlockQuestion from "./function-to-block-question"
import BlockToFunctionQuestion from "./block-to-function-question"
import DemoQuestion from "./demo-question"

function LessonQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState

	if (!currentQuestionState) {
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					Loading question...
				</p>
			</div>
		)
	}

	const { question } = currentQuestionState

	if (question.questionType === "DEMO") {
		return <DemoQuestion />
	}

	if (question.questionType === "FUNCTION_TO_BLOCK" && question.functionToBlockFlashcard) {
		return <FunctionToBlockQuestion />
	}

	if (question.questionType === "BLOCK_TO_FUNCTION" && question.blockToFunctionFlashcard) {
		return <BlockToFunctionQuestion />
	}

	if (question.questionType === "FILL_IN_BLANK" && question.fillInTheBlank) {
		// TODO: Implement FILL_IN_BLANK UI
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					FILL_IN_BLANK question type not yet implemented
				</p>
			</div>
		)
	}

	return (
		<div className="text-center">
			<p className="text-gray-500 dark:text-gray-400">
				Unknown question type
			</p>
		</div>
	)
}

export default observer(LessonQuestion)
