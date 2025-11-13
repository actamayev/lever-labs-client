import { useEffect } from "react"
import questClass from "../../classes/quest-class"

/**
 * Custom hook to handle Escape key press for block-to-function question components
 * - Escape: Unselects currently selected answer choice
 */
export default function useBlockToFunctionEscapeHandler(): void {
	const currentQuestionState = questClass.currentQuestionState
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage

	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.blockToFunctionFlashcard || isInConfirmationStage) {
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
	}, [currentQuestionState?.question.blockToFunctionFlashcard, currentQuestionState?.selectedAnswerId, isInConfirmationStage])
}

