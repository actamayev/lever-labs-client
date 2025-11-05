import { useEffect } from "react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import learnClass from "../../classes/learn-class"
import isOtpInputFocused from "../../utils/check-otp-input-focused"

/**
 * Custom hook to handle number key presses for matching question components
 * - Keys 1-5: Select coding blocks (left side)
 * - Keys 6-9, 0: Select matching answer choices (right side)
 */
export default function useMatchingQuestionKeyboardHandler(): void {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.matching || isInConfirmationStage) {
			return (): void => {}
		}

		// eslint-disable-next-line complexity
		const handleKeyDown = (event: KeyboardEvent): void => {
			const key = event.key
			// Don't handle keyboard events if OTP input is focused
			if (isOtpInputFocused()) return

			const matchingData = currentQuestionState.question.matching
			if (!matchingData) return

			const matchingPairs = matchingData.matchingAnswerChoice

			// Extract coding blocks and sort by order
			const codingBlocks = matchingPairs.map((pair): {
				codingBlockId: number
				codingBlockJson: BlocklyJson
				order: number
			} => ({
				codingBlockId: pair.codingBlock.codingBlockId,
				codingBlockJson: pair.codingBlock.codingBlockJson,
				order: pair.order
			}))
			const sortedCodingBlocks = [...codingBlocks].sort((a, b): number => a.order - b.order)

			// Extract matching answer choices and sort by order
			const matchingAnswerChoice = matchingPairs.map((pair): {
				matchingAnswerChoiceTextId: number
				order: number
				text: string
			} => ({
				matchingAnswerChoiceTextId: pair.matchingAnswerChoiceText.matchingAnswerChoiceTextId,
				order: pair.order,
				text: pair.matchingAnswerChoiceText.answerChoiceText
			}))
			const sortedMatchingChoices = [...matchingAnswerChoice].sort((a, b): number => a.order - b.order)

			const question = currentQuestionState.question

			// Handle keys 1-5 for coding blocks (left side)
			if (key >= "1" && key <= "5") {
				const blockIndex = parseInt(key, 10) - 1 // Convert to 0-based index
				if (blockIndex >= 0 && blockIndex < sortedCodingBlocks.length) {
					const block = sortedCodingBlocks[blockIndex]
					// Use the same handler as mouse clicks - checks if already matched and submits if both sides selected
					learnClass.handleMatchingCodingBlockClick(question.questionId, block.codingBlockId)
				}
			}

			// Handle keys 6-9 for matching choices (right side)
			if (key >= "6" && key <= "9") {
				const choiceIndex = parseInt(key, 10) - 6 // Convert to 0-based index (6->0, 7->1, 8->2, 9->3)
				if (choiceIndex >= 0 && choiceIndex < sortedMatchingChoices.length) {
					const choice = sortedMatchingChoices[choiceIndex]
					// Use the same handler as mouse clicks - checks if already matched and submits if both sides selected
					learnClass.handleMatchingChoiceClick(question.questionId, choice.matchingAnswerChoiceTextId)
				}
			}

			// Handle key 0 for the last matching choice (right side)
			if (key === "0") {
				const lastChoiceIndex = sortedMatchingChoices.length - 1
				if (lastChoiceIndex >= 0) {
					const choice = sortedMatchingChoices[lastChoiceIndex]
					// Use the same handler as mouse clicks - checks if already matched and submits if both sides selected
					learnClass.handleMatchingChoiceClick(question.questionId, choice.matchingAnswerChoiceTextId)
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return (): void => window.removeEventListener("keydown", handleKeyDown)
	}, [
		currentQuestionState?.question.matching,
		currentQuestionState?.question.matchingAnswerState,
		isInConfirmationStage,
		currentQuestionState
	])
}

