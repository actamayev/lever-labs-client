
"use client"

import { observer } from "mobx-react"
import questClass from "../../classes/quest-class"
import FunctionToBlockQuestion from "./function-to-block-question"
import BlockToFunctionQuestion from "./block-to-function-question"
import FillInBlankQuestion from "./fill-in-blank-question"
import ActionToCodeMultipleChoiceQuestion from "./action-to-code-multiple-choice-question"
import ActionToCodeOpenEndedQuestion from "./action-to-code-open-ended-question"
import MatchingQuestion from "./matching/matching-question"

// eslint-disable-next-line complexity
function LessonQuestion(): React.ReactNode {
	const currentQuestionState = questClass.currentQuestionState

	if (!currentQuestionState) {
		return (
			<div className="text-center">
				<p className="text-wolf">
					Loading question...
				</p>
			</div>
		)
	}

	const { question } = currentQuestionState

	if (question.questionType === "FUNCTION_TO_BLOCK" && question.functionToBlockFlashcard) {
		return <FunctionToBlockQuestion />
	}

	if (question.questionType === "BLOCK_TO_FUNCTION" && question.blockToFunctionFlashcard) {
		return <BlockToFunctionQuestion />
	}

	if (question.questionType === "FILL_IN_BLANK" && question.fillInTheBlank) {
		return <FillInBlankQuestion />
	}

	if (question.questionType === "ACTION_TO_CODE_MULTIPLE_CHOICE" && question.actionToCodeMultipleChoice) {
		return <ActionToCodeMultipleChoiceQuestion />
	}

	if (question.questionType === "ACTION_TO_CODE_OPEN_ENDED" && question.actionToCodeOpenEnded) {
		return <ActionToCodeOpenEndedQuestion />
	}

	if (question.questionType === "MATCHING" && question.matching) {
		return <MatchingQuestion />
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
