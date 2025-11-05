"use client"

import { QuestionUUID } from "@lever-labs/common-ts/types/utils"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import learnClass from "../../classes/learn-class"

export default function submitMatchingAnswer(
	questionId: QuestionUUID,
	codingBlockId: number,
	matchingAnswerChoiceTextId: number
): boolean {
	try {
		// Check correctness by searching the client-side lesson question map (instant feedback)
		const lesson = Array.from(learnClass.lessonsById.values()).find((l): boolean =>
			l.lessonQuestionMap?.some((q): boolean => q.question.questionId === questionId) ?? false
		)

		let isCorrect = false

		if (lesson?.lessonQuestionMap) {
			const questionMap = lesson.lessonQuestionMap.find((q): boolean => q.question.questionId === questionId)
			if (questionMap?.question.matching?.matchingAnswerChoice) {
				// Check if the codingBlockId and matchingAnswerChoiceTextId are in the same MatchingAnswerChoice
				isCorrect = questionMap.question.matching.matchingAnswerChoice.some((pair): boolean =>
					pair.codingBlock.codingBlockId === codingBlockId &&
					pair.matchingAnswerChoiceText.matchingAnswerChoiceTextId === matchingAnswerChoiceTextId
				)
			}
		}

		// Submit the answer to the backend in the background (fire and forget)
		leverLabsApiClient.learnDataService.submitMatchingAnswer(
			questionId,
			codingBlockId,
			matchingAnswerChoiceTextId
		).catch((error): void => {
			console.error("Failed to submit matching answer to backend:", error)
		})

		return isCorrect
	} catch (error) {
		console.error("Error in submitMatchingAnswer:", error)
		return false
	}
}
