import { useEffect } from "react"
import questClass from "../../classes/quest-class"
import isOtpInputFocused from "../../utils/check-otp-input-focused"

/**
 * Custom hook to handle Enter key presses for question components
 * - If answer is selected and not in confirmation stage: triggers check answer
 * - If in confirmation stage: triggers continue to next question
 */
export default function usePressEnterQuestionKeyboardHandler(): void {
	const currentQuestionState = questClass.currentQuestionState
	const isInConfirmationStage = questClass.isInQuestionConfirmationStage

	useEffect((): (() => void) => {
		if (!currentQuestionState) return (): void => {}

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key !== "Enter") return
			// Don't handle keyboard events if OTP input is focused
			if (isOtpInputFocused()) return
			if (currentQuestionState.selectedAnswerId !== null && !isInConfirmationStage) {
				// Check answer if not in confirmation stage
				const lesson = Array.from(questClass.lessonsById.values()).find((l): boolean =>
					l.lessonQuestionMap?.some((q): boolean =>
						q.question.questionId === currentQuestionState.question.questionId
					) ?? false
				)
				if (lesson) {
					void questClass.checkCurrentAnswer(lesson.lessonId)
				}
			} else if (isInConfirmationStage) {
				// Continue to next question if in confirmation stage
				const lesson = Array.from(questClass.lessonsById.values()).find((l): boolean =>
					l.lessonQuestionMap?.some((q): boolean =>
						q.question.questionId === currentQuestionState.question.questionId
					) ?? false
				)
				if (lesson) {
					void questClass.continueToNextQuestion(lesson.lessonId)
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return (): void => window.removeEventListener("keydown", handleKeyDown)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentQuestionState?.selectedAnswerId, isInConfirmationStage, currentQuestionState?.question?.questionId])
}
