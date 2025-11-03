"use client"

import { observer } from "mobx-react"
import { Play } from "lucide-react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { cn } from "../../lib/utils"
import { TactileButton } from "../buttons/tactile-button"
import learnClass from "../../classes/learn-class"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import OpenEndedQuestion from "./open-ended-question"

function ActionToCodeOpenEndedQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const actionToCodeOpenEnded = currentQuestionState?.question.actionToCodeOpenEnded

	const handleAnswerChange = (questionId: string, blocklyJson: BlocklyJson, cppCode: string): void => {
		learnClass.setActionToCodeOpenEndedAnswer(questionId, blocklyJson, cppCode)
	}

	const renderLeftButtons = (referenceSolutionCpp?: string): React.ReactNode => {
		const handlePlayDemo = async (): Promise<void> => {
			if (referenceSolutionCpp) {
				await sendCppToPip(referenceSolutionCpp)
			}
		}

		return (
			<TactileButton
				onClick={handlePlayDemo}
				shadowClass="shadow-charging-green-2"
				className={cn(
					"h-14 w-full px-8 py-4 text-xl font-semibold rounded-2xl text-standard-background",
					"bg-charging-green flex items-center gap-3 justify-center"
				)}
				shadowHeight={4}
			>
				<Play className="size-6 fill-current" />
				PLAY DEMO
			</TactileButton>
		)
	}

	if (!actionToCodeOpenEnded) {
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					No action-to-code-open-ended data available
				</p>
			</div>
		)
	}

	return (
		<OpenEndedQuestion
			questionData={actionToCodeOpenEnded}
			onAnswerChange={handleAnswerChange}
			errorMessage="No action-to-code-open-ended data available"
			renderLeftButtons={renderLeftButtons}
		/>
	)
}

export default observer(ActionToCodeOpenEndedQuestion)
