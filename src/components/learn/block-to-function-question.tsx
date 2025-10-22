/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import { useEffect } from "react"
import learnClass from "../../classes/learn-class"
import { TactileButton } from "../ui/tactile-button"
import LearnMiniSandbox from "./learn-mini-sandbox"
import useQuestionKeyboardHandler from "../../hooks/learn/use-question-keyboard-handler"
import { cn } from "../../lib/shadcn/utils"
import isOtpInputFocused from "../../utils/check-otp-input-focused"

// eslint-disable-next-line max-lines-per-function
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
			// Don't handle keyboard events if OTP input is focused
			if (isOtpInputFocused()) return
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

	const { codingBlock, blockToFunctionAnswerChoice, questionText } = currentQuestionState.question.blockToFunctionFlashcard
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
			<div className="flex justify-center">
				<div className="relative h-48 w-96">
					<LearnMiniSandbox
						blocklyJson={codingBlock.codingBlockJson}
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
