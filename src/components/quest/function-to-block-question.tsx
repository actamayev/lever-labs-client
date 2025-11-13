"use client"
import { observer } from "mobx-react"
import { useCallback, useRef } from "react"
import { CodingBlock } from "@lever-labs/common-ts/types/quest"
import questClass from "../../classes/quest-class"
// import { TactileButton } from "../shadcn/ui/tactile-button"
import QuestMiniSandbox from "./quest-mini-sandbox"
import usePressEnterQuestionKeyboardHandler from "../../hooks/quest/use-press-enter-question-keyboard-handler"
import useFunctionToBlockKeyboardHandler from "../../hooks/quest/use-function-to-block-keyboard-handler"
import useFunctionToBlockEscapeHandler from "../../hooks/quest/use-function-to-block-escape-handler"
import { cn } from "../../lib/utils"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"

function FunctionToBlockQuestion(): React.ReactNode {
	const currentQuestionState = questClass.currentQuestionState
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage
	const timeoutRef = useRef<Record<number, NodeJS.Timeout | undefined>>({})

	// Use the keyboard handler hooks
	usePressEnterQuestionKeyboardHandler()
	useFunctionToBlockKeyboardHandler()
	useFunctionToBlockEscapeHandler()

	const handleMouseDown = useCallback(async (
		choiceId: number,
		codingBlock: CodingBlock
	): Promise<void> => {
		// Send click code immediately
		if (codingBlock.onClickCppToRun) {
			await sendCppToPip(codingBlock.onClickCppToRun)
		}

		// Clear any existing timeout for this choice
		if (timeoutRef.current[choiceId]) {
			clearTimeout(timeoutRef.current[choiceId])
		}

		// Set a 2-second timeout to send release code
		if (codingBlock.onReleaseCppToRun) {
			const releaseCpp = codingBlock.onReleaseCppToRun
			timeoutRef.current[choiceId] = setTimeout(async (): Promise<void> => {
				if (releaseCpp) {
					await sendCppToPip(releaseCpp)
					timeoutRef.current[choiceId] = undefined
				}
			}, 2000)
		}
	}, [])

	if (!currentQuestionState?.question.functionToBlockFlashcard) return null

	const { questionText, functionToBlockAnswerChoice } = currentQuestionState.question.functionToBlockFlashcard
	const { selectedAnswerId } = currentQuestionState

	// Sort answer choices by order
	const sortedChoices = [...functionToBlockAnswerChoice].sort((a, b): number => a.order - b.order)

	return (
		<div>
			<h2 className="text-3xl font-semibold text-question-text">
				{questionText}
			</h2>

			<div
				className="flex flex-col lg:flex-row justify-center lg:justify-start gap-4 px-4 lg:px-0"
				style={{ transform: "translateY(5rem)" }}
			>
				{sortedChoices.map((choice, index): React.ReactNode => {
					const isSelected = selectedAnswerId === choice.functionToBlockAnswerChoiceId
					const cardNumber = index + 1

					const hasClickOrReleaseHandlers = choice.codingBlock.onClickCppToRun !== null ||
						choice.codingBlock.onReleaseCppToRun !== null

					return (
						<div
							className={cn(
								"relative w-full max-w-sm lg:w-96 cursor-pointer rounded-3xl duration-0 shrink-0",
								isSelected ? "outline-2 outline-macaw" : "outline-2 outline-transparent hover:outline-macaw/50",
								isInConfirmationStage ? "cursor-default" : "cursor-pointer"
							)}
							onClick={(): void => {
								if (!isInConfirmationStage) {
									questClass.setSelectedAnswer(choice.functionToBlockAnswerChoiceId)
								}
							}}
							onMouseDown={hasClickOrReleaseHandlers ?
								(): void => {
									void handleMouseDown(choice.functionToBlockAnswerChoiceId, choice.codingBlock)
								} :
								undefined}
							data-choice-id={choice.functionToBlockAnswerChoiceId}
							key={choice.functionToBlockAnswerChoiceId}
						>
							<div
								className={cn(
									"h-48 rounded-t-3xl overflow-hidden",
									hasClickOrReleaseHandlers && "pointer-events-none"
								)}
							>
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

export default observer(FunctionToBlockQuestion)
