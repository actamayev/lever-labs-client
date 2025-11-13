import { useEffect } from "react"
import questClass from "../../classes/quest-class"
import isOtpInputFocused from "../../utils/check-otp-input-focused"

/**
 * Custom hook to handle number key presses for action-to-code multiple choice question components
 * - Keys 1-3: Select answer choices
 */
export default function useActionToCodeMultipleChoiceKeyboardHandler(): void {
	const currentQuestionState = questClass.currentQuestionState
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage

	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.actionToCodeMultipleChoice || isInConfirmationStage) {
			return (): void => {}
		}

		const handleKeyDown = (event: KeyboardEvent): void => {
			const key = event.key
			if (key !== "1" && key !== "2" && key !== "3") return
			// Don't handle keyboard events if OTP input is focused
			if (isOtpInputFocused()) return

			const choiceIndex = parseInt(key, 10) - 1 // Convert to 0-based index
			const multipleChoice = currentQuestionState.question.actionToCodeMultipleChoice
			if (!multipleChoice) return

			const sortedChoices = [...multipleChoice.actionToCodeMultipleChoiceAnswerChoice]
				.sort((a, b): number => a.order - b.order)

			if (choiceIndex >= 0 && choiceIndex < sortedChoices.length) {
				const selectedChoice = sortedChoices[choiceIndex]
				questClass.setSelectedAnswer(selectedChoice.actionToCodeMultipleChoiceAnswerChoiceId)
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return (): void => window.removeEventListener("keydown", handleKeyDown)
	}, [currentQuestionState?.question.actionToCodeMultipleChoice, isInConfirmationStage])
}
