/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import { useCallback } from "react"
import { Play } from "lucide-react"
import questClass from "../../classes/quest-class"
import { TactileButton } from "../buttons/tactile-button"
import QuestMiniSandbox from "./quest-mini-sandbox"
import usePressEnterQuestionKeyboardHandler from "../../hooks/quest/use-press-enter-question-keyboard-handler"
import useBlockToFunctionKeyboardHandler from "../../hooks/quest/use-block-to-function-keyboard-handler"
import useBlockToFunctionEscapeHandler from "../../hooks/quest/use-block-to-function-escape-handler"
import { cn } from "../../lib/utils"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import getCppGenerator from "../../utils/cpp/cpp-generator"

function BlockToFunctionQuestion(): React.ReactNode {
	const currentQuestionState = questClass.currentQuestionState
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage

	// Use the keyboard handler hooks
	usePressEnterQuestionKeyboardHandler()
	useBlockToFunctionKeyboardHandler()
	useBlockToFunctionEscapeHandler()

	const codingBlock = currentQuestionState?.question.blockToFunctionFlashcard?.codingBlock

	const handlePlay = useCallback(async (): Promise<void> => {
		if (!codingBlock) return
		const cppCode = await getCppGenerator().generateCppFromJson(codingBlock.codingBlockJson)
		if (cppCode) {
			await sendCppToPip(cppCode)
		}
	}, [codingBlock])

	if (!currentQuestionState?.question.blockToFunctionFlashcard || !codingBlock) {
		return null
	}

	const { blockToFunctionAnswerChoice, questionText } = currentQuestionState.question.blockToFunctionFlashcard
	const { selectedAnswerId } = currentQuestionState

	// Sort answer choices by order
	const sortedChoices = [...blockToFunctionAnswerChoice].sort((a, b): number => a.order - b.order)

	return (
		<div>
			{/* Question text */}
			<h2 className="text-3xl font-semibold text-question-text mb-8">
				{questionText}
			</h2>

			{/* Question: Show the block */}
			<div className="flex justify-center items-center gap-4">
				<div className="relative h-48 w-96">
					<QuestMiniSandbox codingBlock={codingBlock} className="w-full h-full" />
				</div>
				{/* <TactileButton
					onClick={handlePlay}
					shadowClass="shadow-charging-green-2"
					className={cn(
						"h-14 w-14 px-4 py-4 rounded-2xl text-standard-background",
						"bg-charging-green flex items-center justify-center shrink-0"
					)}
					shadowHeight={4}
				>
					<Play className="size-6 fill-current" />
				</TactileButton> */}
			</div>

			{/* Answer choices: Function descriptions */}
			<div className="flex flex-col gap-3" style={{ transform: "translateY(2rem)" }}>
				{sortedChoices.map((choice, index): React.ReactNode => {
					const isSelected = selectedAnswerId === choice.blockToFunctionAnswerChoiceId
					const choiceNumber = index + 1

					return (
						<TactileButton
							key={choice.blockToFunctionAnswerChoiceId}
							onClick={(): void => {
								if (!isInConfirmationStage) {
									questClass.setSelectedAnswer(choice.blockToFunctionAnswerChoiceId)
								}
							}}
							// eslint-disable-next-line max-len
							className={`h-12 w-full flex items-center justify-start px-4 text-lg font-semibold rounded-lg duration-0 relative ${
								isSelected
									? "bg-standard-background-hover border-2 border-macaw"
									: isInConfirmationStage
										? "bg-standard-background border-2 border-swan cursor-default"
										: "bg-standard-background border-2 border-swan hover:bg-polar"
							}`}
							shadowClass={isSelected ? "shadow-macaw" : "shadow-swan"}
							shadowHeight={2}
							disabled={isInConfirmationStage}
							shouldHoverPushButton={false}
						>
							{/* Number badge on the left */}
							<div
								className={cn(
									"absolute left-2 w-8 h-8 rounded-lg border-2",
									"flex items-center justify-center text-sm font-bold",
									isSelected ? "border-macaw text-macaw" : "border-swan text-hare"
								)}
							>
								{choiceNumber}
							</div>
							<span className={cn("text-left text-eel ml-10", isSelected ? "text-macaw" : "text-eel")}>
								{choice.functionDescriptionText}
							</span>
						</TactileButton>
					)
				})}
			</div>
		</div>
	)
}

export default observer(BlockToFunctionQuestion)
