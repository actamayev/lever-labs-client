"use client"

import { observer } from "mobx-react"
import { Play } from "lucide-react"
import questClass from "../../classes/quest-class"
import QuestMiniSandbox from "./quest-mini-sandbox"
import usePressEnterQuestionKeyboardHandler from "../../hooks/quest/use-press-enter-question-keyboard-handler"
import useActionToCodeMultipleChoiceKeyboardHandler from "../../hooks/quest/use-action-to-code-multiple-choice-keyboard-handler"
import useActionToCodeMultipleChoiceEscapeHandler from "../../hooks/quest/use-action-to-code-multiple-choice-escape-handler"
import { cn } from "../../lib/utils"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import { TactileButton } from "../buttons/tactile-button"
import StopCodeButton from "../buttons/stop-code-button"

function ActionToCodeMultipleChoiceQuestion(): React.ReactNode {
	const currentQuestionState = questClass.currentQuestionState
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage

	// Use the keyboard handler hooks
	usePressEnterQuestionKeyboardHandler()
	useActionToCodeMultipleChoiceKeyboardHandler()
	useActionToCodeMultipleChoiceEscapeHandler()

	if (!currentQuestionState?.question.actionToCodeMultipleChoice) return null

	const {
		questionText,
		actionToCodeMultipleChoiceAnswerChoice,
		referenceSolutionCpp
	} = currentQuestionState.question.actionToCodeMultipleChoice
	const { selectedAnswerId } = currentQuestionState

	// Sort answer choices by order
	const sortedChoices = [...actionToCodeMultipleChoiceAnswerChoice].sort((a, b): number => a.order - b.order)

	const handlePlayDemo = async (): Promise<void> => {
		if (referenceSolutionCpp) {
			await sendCppToPip(referenceSolutionCpp)
		}
	}

	return (
		<div>
			<h2 className="text-3xl font-semibold text-question-text mb-8">
				{questionText}
			</h2>
			<div className="flex justify-center gap-3 mb-8">
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
				<StopCodeButton
					className="h-14 px-8 py-4 text-xl font-semibold rounded-2xl gap-3"
					pauseClasses="size-4!"
				/>
			</div>

			<div
				className="flex flex-col lg:flex-row justify-center lg:justify-start gap-4 px-4 lg:px-0"
				style={{ transform: "translateY(5rem)" }}
			>
				{sortedChoices.map((choice, index): React.ReactNode => {
					const isSelected = selectedAnswerId === choice.actionToCodeMultipleChoiceAnswerChoiceId
					const cardNumber = index + 1

					return (
						<div
							className={cn(
								"relative w-full max-w-sm lg:w-96 cursor-pointer rounded-3xl duration-0 shrink-0",
								isSelected ? "outline-2 outline-macaw" : "outline-2 outline-transparent hover:outline-macaw/50",
								isInConfirmationStage ? "cursor-default" : "cursor-pointer"
							)}
							onClick={(): void => {
								if (!isInConfirmationStage) {
									questClass.setSelectedAnswer(choice.actionToCodeMultipleChoiceAnswerChoiceId)
								}
							}}
							key={choice.actionToCodeMultipleChoiceAnswerChoiceId}
						>
							<div className="h-48 rounded-t-3xl overflow-hidden">
								<QuestMiniSandbox
									codingBlock={choice.codingBlock}
									className="w-full h-full rounded-t-3xl rounded-b-none"
								/>
							</div>
							{/* Number lip below the sandbox */}
							<div className={cn(
								"h-8 rounded-b-3xl flex items-center justify-center text-lg font-bold",
								isSelected ? "bg-macaw text-white" : "bg-swan text-hare"
							)}>
								{cardNumber}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default observer(ActionToCodeMultipleChoiceQuestion)
