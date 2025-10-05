/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import { useEffect } from "react"
import learnClass from "../../classes/learn-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import BlockVisualization from "./block-visualization"
import useQuestionKeyboardHandler from "../../hooks/learn/use-question-keyboard-handler"
import { cn } from "../../lib/shadcn/utils"

function BlockToFunctionQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	// Use the keyboard handler hook
	useQuestionKeyboardHandler()

	// Handle number key selection (1, 2, 3)
	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.blockToFunctionFlashcard || isInConfirmationStage) {
			return (): void => {}
		}

		const handleKeyDown = (event: KeyboardEvent): void => {
			const key = event.key
			if (key !== "1" && key !== "2" && key !== "3") return
			const choiceIndex = parseInt(key, 10) - 1 // Convert to 0-based index
			const flashcard = currentQuestionState.question.blockToFunctionFlashcard
			if (!flashcard) return
			const sortedChoices = [...flashcard.blockToFunctionAnswerChoice]
				.sort((a, b): number => a.order - b.order)
			if (choiceIndex >= 0 && choiceIndex < sortedChoices.length) {
				const selectedChoice = sortedChoices[choiceIndex]
				learnClass.setSelectedAnswer(selectedChoice.blockToFunctionAnswerChoiceId)
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return (): void => window.removeEventListener("keydown", handleKeyDown)
	}, [currentQuestionState?.question.blockToFunctionFlashcard, isInConfirmationStage])

	if (!currentQuestionState?.question.blockToFunctionFlashcard) {
		return null
	}

	const { codingBlock, blockToFunctionAnswerChoice } = currentQuestionState.question.blockToFunctionFlashcard
	const { selectedAnswerId } = currentQuestionState

	// Sort answer choices by order
	const sortedChoices = [...blockToFunctionAnswerChoice].sort((a, b): number => a.order - b.order)

	return (
		<div>
			{/* Question text */}
			<h2 className="text-3xl font-semibold text-questionText mb-8">
				What can I do with this block?
			</h2>

			{/* Question: Show the block */}
			<div className="flex justify-center mb-8">
				<div className="relative h-32 w-48">
					<BlockVisualization
						codingBlock={codingBlock}
						className="w-full h-full"
					/>
				</div>
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
									learnClass.setSelectedAnswer(choice.blockToFunctionAnswerChoiceId)
								}
							}}
							// eslint-disable-next-line max-len
							className={`h-12 w-full flex items-center justify-start px-4 text-lg font-semibold rounded-lg duration-0 relative ${
								isSelected
									? "bg-standardBackgroundHover border-2 border-macaw"
									: isInConfirmationStage
										? "bg-standardBackground border-2 border-swan cursor-default"
										: "bg-standardBackground border-2 border-swan hover:bg-polar"
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
							<span className="text-left text-eel ml-10">
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
