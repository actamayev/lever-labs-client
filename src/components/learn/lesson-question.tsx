
"use client"

import { observer } from "mobx-react"
import learnClass from "../../classes/learn-class"
import FunctionToBlockQuestion from "./function-to-block-question"
import BlockToFunctionQuestion from "./block-to-function-question"
import DemoQuestion from "./demo-question"
import FillInBlankQuestion from "./fill-in-blank-question"

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
		return <FillInBlankQuestion />
	}

	return (
		<div className="text-center">
			<p className="text-wolf">
				Unknown question type
			</p>
		</div>
	)
}

export default observer(LessonQuestion)
