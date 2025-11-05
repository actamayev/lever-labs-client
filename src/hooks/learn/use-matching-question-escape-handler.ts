import { useEffect } from "react"
import learnClass from "../../classes/learn-class"

/**
 * Custom hook to handle Escape key press for matching question components
 * - Escape: Unselects currently selected coding block or matching answer choice
 */
export default function useMatchingQuestionEscapeHandler(): void {
	const currentQuestionState = learnClass.currentQuestionState
	const isInConfirmationStage = learnClass.isInQuestionConfirmationStage

	useEffect((): (() => void) => {
		if (!currentQuestionState?.question.matching || isInConfirmationStage) {
			return (): void => {}
		}

		const questionId = currentQuestionState.question.questionId
		if (!questionId) return (): void => {}

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				const lesson = Array.from(learnClass.lessonsById.values()).find((l): boolean =>
					l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
				)

				if (!lesson) return

				const state = learnClass.getMatchingAnswerState(questionId)
				if (state.selectedCodingBlockId !== null || state.selectedMatchingAnswerId !== null) {
					learnClass.clearMatchingSelections(lesson.lessonId, questionId)
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return (): void => window.removeEventListener("keydown", handleKeyDown)
	}, [currentQuestionState?.question.matching, currentQuestionState?.question.questionId, isInConfirmationStage])
}
