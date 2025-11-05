import { useEffect } from "react"
import learnClass from "../../classes/learn-class"
import isOtpInputFocused from "../../utils/check-otp-input-focused"

/**
 * Custom hook to handle number key presses for block-to-function question components
 * - Keys 1-3: Select answer choices
 */
export default function useBlockToFunctionKeyboardHandler(): void {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

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
}

