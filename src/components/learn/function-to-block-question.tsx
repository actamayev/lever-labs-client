"use client"
import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import learnClass from "../../classes/learn-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import BlockVisualization from "./block-visualization"
import useQuestionKeyboardHandler from "../../hooks/learn/use-question-keyboard-handler"
import { cn } from "../../lib/shadcn/utils"

// eslint-disable-next-line max-lines-per-function
function FunctionToBlockQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage
	const lastAnswerWasCorrect = learnClass.lastAnswerWasCorrect

	// Use the keyboard handler hook
	useQuestionKeyboardHandler()

	// Handle number key selection (1, 2, 3)
	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.functionToBlockFlashcard || isInConfirmationStage) {
			return (): void => {}
		}

		const handleKeyDown = (event: KeyboardEvent): void => {
			const key = event.key
			if (key !== "1" && key !== "2" && key !== "3") return
			const choiceIndex = parseInt(key, 10) - 1 // Convert to 0-based index
			const flashcard = currentQuestionState.question.functionToBlockFlashcard
			if (!flashcard) return
			const sortedChoices = [...flashcard.functionToBlockAnswerChoice]
				.sort((a, b): number => a.order - b.order)
			if (choiceIndex >= 0 && choiceIndex < sortedChoices.length) {
				const selectedChoice = sortedChoices[choiceIndex]
				learnClass.setSelectedAnswer(selectedChoice.functionToBlockAnswerChoiceId)
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return (): void => window.removeEventListener("keydown", handleKeyDown)
	}, [currentQuestionState?.question.functionToBlockFlashcard, isInConfirmationStage])

	const buttonExtraClass = useCallback((isSelected: boolean): string => {
		if (isSelected) {
			if (lastAnswerWasCorrect) {
				return "bg-questionCorrectGreen border-2 border-questionCorrectGreen-1 cursor-default"
			}
			return "bg-standardBackgroundHover border-2 border-macaw"
		}
		if (isInConfirmationStage) return "bg-standardBackground border-2 border-swan cursor-default"
		return "bg-standardBackground border-2 border-swan hover:bg-polar"
	}, [isInConfirmationStage, lastAnswerWasCorrect])

	const numberBadgeClass = useCallback((isSelected: boolean): string => {
		if (isSelected) {
			if (lastAnswerWasCorrect) {
				return "border-questionCorrectGreen-1 text-questionCorrectGreen-2"
			}
			return "border-macaw text-macaw"
		}
		return "border-swan text-hare"
	}, [lastAnswerWasCorrect])

	const shadowClass = useCallback((isSelected: boolean): string => {
		if (isSelected) {
			if (lastAnswerWasCorrect) {
				return "shadow-questionCorrectGreen-1"
			}
			return "shadow-macaw"
		}
		return "shadow-swan"
	}, [lastAnswerWasCorrect])

	if (!currentQuestionState?.question.functionToBlockFlashcard) {
		return null
	}

	const { questionText, functionToBlockAnswerChoice } = currentQuestionState.question.functionToBlockFlashcard
	const { selectedAnswerId } = currentQuestionState

	// Sort answer choices by order
	const sortedChoices = [...functionToBlockAnswerChoice].sort((a, b): number => a.order - b.order)

	return (
		<div>
			<h2 className="text-3xl font-semibold text-questionText">
				{questionText}
			</h2>

			<div className="flex justify-start gap-4" style={{ transform: "translateY(5rem)" }}>
				{sortedChoices.map((choice, index): React.ReactNode => {
					const isSelected = selectedAnswerId === choice.functionToBlockAnswerChoiceId
					const cardNumber = index + 1

					return (
						<TactileButton
							key={choice.functionToBlockAnswerChoiceId}
							onClick={(): void => {
								if (!isInConfirmationStage) {
									learnClass.setSelectedAnswer(choice.functionToBlockAnswerChoiceId)
								}
							}}
							className={`h-64 w-48 flex items-center justify-center text-lg font-semibold rounded-lg duration-0 relative ${
								buttonExtraClass(isSelected)
							}`}
							shadowClass={isSelected ? shadowClass(isSelected) : "shadow-swan"}
							shadowHeight={2}
							shouldHoverPushButton={false}
							disabled={isInConfirmationStage}
							disableOpacityOnDisabled={false}
						>
							<BlockVisualization
								codingBlock={choice.codingBlock}
								className="w-full h-full p-4"
							/>
							{/* Number badge in bottom right */}
							<div
								className={cn(
									"absolute bottom-2 right-2 w-8 h-8 rounded-lg border-2",
									"flex items-center justify-center text-sm font-bold",
									numberBadgeClass(isSelected)
								)}
							>
								{cardNumber}
							</div>
						</TactileButton>
					)
				})}
			</div>
		</div>
	)
}

export default observer(FunctionToBlockQuestion)
