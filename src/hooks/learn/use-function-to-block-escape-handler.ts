import { useEffect } from "react"
import learnClass from "../../classes/learn-class"

/**
 * Custom hook to handle Escape key press for function-to-block question components
 * - Escape: Unselects currently selected answer choice
 */
export default function useFunctionToBlockEscapeHandler(): void {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.functionToBlockFlashcard || isInConfirmationStage) {
			return (): void => {}
		}

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				if (currentQuestionState.selectedAnswerId !== null) {
					learnClass.setSelectedAnswer(null)
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return (): void => window.removeEventListener("keydown", handleKeyDown)
	}, [currentQuestionState?.question.functionToBlockFlashcard, currentQuestionState?.selectedAnswerId, isInConfirmationStage])
}
