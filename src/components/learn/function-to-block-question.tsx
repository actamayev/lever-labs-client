"use client"
import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import learnClass from "../../classes/learn-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import LearnMiniSandbox from "./learn-mini-sandbox"
import useQuestionKeyboardHandler from "../../hooks/learn/use-question-keyboard-handler"
import { cn } from "../../lib/shadcn/utils"
import normalizeSandboxJson from "../../utils/sandbox/normalize-sandbox-json"


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

	// const buttonExtraClass = useCallback((isSelected: boolean): string => {
	// 	if (isSelected) {
	// 		if (lastAnswerWasCorrect) {
	// 			return "bg-questionCorrectGreen border-2 border-questionCorrectGreen-1 cursor-default"
	// 		}
	// 		return "bg-standardBackgroundHover border-2 border-macaw"
	// 	}
	// 	if (isInConfirmationStage) return "bg-standardBackground border-2 border-swan cursor-default"
	// 	return "bg-standardBackground border-2 border-swan hover:bg-polar"
	// }, [isInConfirmationStage, lastAnswerWasCorrect])

	// const numberBadgeClass = useCallback((isSelected: boolean): string => {
	// 	if (isSelected) {
	// 		if (lastAnswerWasCorrect) {
	// 			return "border-questionCorrectGreen-1 text-questionCorrectGreen-2"
	// 		}
	// 		return "border-macaw text-macaw"
	// 	}
	// 	return "border-swan text-hare"
	// }, [lastAnswerWasCorrect])

	// const shadowClass = useCallback((isSelected: boolean): string => {
	// 	if (isSelected) {
	// 		if (lastAnswerWasCorrect) {
	// 			return "shadow-questionCorrectGreen-1"
	// 		}
	// 		return "shadow-macaw"
	// 	}
	// 	return "shadow-swan"
	// }, [lastAnswerWasCorrect])

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
						<div
							className={cn(
								"relative w-96 cursor-pointer rounded-3xl duration-0",
								isSelected ? "outline-2 outline-macaw" : "outline-2 outline-transparent hover:outline-macaw/50",
								isInConfirmationStage ? "cursor-default" : "cursor-pointer"
							)}
							onClick={(): void => {
								if (!isInConfirmationStage) {
									learnClass.setSelectedAnswer(choice.functionToBlockAnswerChoiceId)
								}
							}}
							key={choice.functionToBlockAnswerChoiceId}
						>
							<div className="h-48 rounded-t-3xl overflow-hidden">
								<LearnMiniSandbox
									blocklyJson={normalizeSandboxJson(choice.codingBlock.codingBlockJson)}
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
