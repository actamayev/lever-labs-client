"use client"

import { observer } from "mobx-react"
import { Play } from "lucide-react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { cn } from "../../lib/utils"
import { TactileButton } from "../buttons/tactile-button"
import learnClass from "../../classes/learn-class"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"
import OpenEndedQuestion from "./open-ended-question"

function ActionToCodeOpenEndedQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const actionToCodeOpenEnded = currentQuestionState?.question.actionToCodeOpenEnded

	const handleAnswerChange = (questionId: string, blocklyJson: BlocklyJson, cppCode: string): void => {
		learnClass.setActionToCodeOpenEndedAnswer(questionId, blocklyJson, cppCode)
	}

	const renderDemoButtons = (referenceSolutionCpp?: string): React.ReactNode => {
		const handlePlayDemo = async (): Promise<void> => {
			if (referenceSolutionCpp) {
				await sendCppToPip(referenceSolutionCpp)
			}
		}

		return (
			<div className="flex justify-center gap-3">
				<TactileButton
					onClick={handlePlayDemo}
					shadowClass="shadow-charging-green-2"
					className={cn(
						"h-14 px-8 py-4 text-xl font-semibold rounded-2xl text-standard-background",
						"bg-charging-green duration-0 flex items-center gap-3"
					)}
					shadowHeight={4}
				>
					<Play className="size-6 fill-current" />
					PLAY DEMO
				</TactileButton>
				<TactileButton
					className="h-14 px-8 py-4 text-xl font-semibold rounded-2xl bg-cardinal text-white duration-0"
					shadowColor="rgb(150, 50, 75)"
					onClick={(): Promise<void> => stopCurrentlyRunningCode(false)}
				>
					STOP
				</TactileButton>
			</div>
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
			renderDemoButtons={renderDemoButtons}
		/>
	)
}

export default observer(ActionToCodeOpenEndedQuestion)
