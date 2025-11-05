import { useEffect } from "react"
import learnClass from "../../classes/learn-class"

/**
 * Custom hook to handle Escape key press for action-to-code multiple choice question components
 * - Escape: Unselects currently selected answer choice
 */
export default function useActionToCodeMultipleChoiceEscapeHandler(): void {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.actionToCodeMultipleChoice || isInConfirmationStage) {
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
	}, [currentQuestionState?.question.actionToCodeMultipleChoice, currentQuestionState?.selectedAnswerId, isInConfirmationStage])
}

