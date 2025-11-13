import { useEffect } from "react"
import questClass from "../../classes/quest-class"

/**
 * Custom hook to handle Escape key press for function-to-block question components
 * - Escape: Unselects currently selected answer choice
 */
export default function useFunctionToBlockEscapeHandler(): void {
	const currentQuestionState = questClass.currentQuestionState
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage

	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.functionToBlockFlashcard || isInConfirmationStage) {
			return (): void => {}
		}

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				if (currentQuestionState.selectedAnswerId !== null) {
					questClass.setSelectedAnswer(null)
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return (): void => window.removeEventListener("keydown", handleKeyDown)
	}, [currentQuestionState?.question.functionToBlockFlashcard, currentQuestionState?.selectedAnswerId, isInConfirmationStage])
}
