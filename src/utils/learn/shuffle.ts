import { CodingBlock } from "@lever-labs/common-ts/types/learn"

/**
 * Random shuffle function using Fisher-Yates algorithm
 * Shuffles the array in place and returns it
 */
function shuffle<T>(array: T[]): T[] {
	const result = array.slice()
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[result[i], result[j]] = [result[j], result[i]]
	}
	return result
}

/**
 * Initialize shuffled arrays for matching questions
 * Extracts coding blocks and matching answer choices, shuffles them, and stores in matchingAnswerState
 */
export default function initializeMatchingQuestionShuffles(questions: LocalLessonQuestionMap[]): void {
	for (const questionMap of questions) {
		if (questionMap.question.questionType === "MATCHING" && questionMap.question.matching?.matchingAnswerChoice) {
			const matchingPairs = questionMap.question.matching.matchingAnswerChoice

			// Extract coding blocks and shuffle
			const codingBlocks = matchingPairs.map((pair): CodingBlock => ({
				codingBlockId: pair.codingBlock.codingBlockId,
				codingBlockJson: pair.codingBlock.codingBlockJson,
				onClickCppToRun: pair.codingBlock.onClickCppToRun,
				onReleaseCppToRun: pair.codingBlock.onReleaseCppToRun,
				needsManualSendButton: pair.codingBlock.needsManualSendButton
			}))

			// Extract matching answer choices and shuffle
			const matchingAnswerChoices = matchingPairs.map((pair): MatchingTextChoice => ({
				matchingAnswerChoiceTextId: pair.matchingAnswerChoiceText.matchingAnswerChoiceTextId,
				text: pair.matchingAnswerChoiceText.answerChoiceText
			}))

			// Initialize matchingAnswerState with shuffled arrays
			questionMap.question.matchingAnswerState = {
				selectedCodingBlockId: null,
				selectedMatchingAnswerId: null,
				matchResults: {},
				correctlyMatchedBlockIds: [],
				correctlyMatchedChoiceIds: [],
				shuffledCodingBlocks: shuffle(codingBlocks),
				shuffledMatchingChoices: shuffle(matchingAnswerChoices)
			}
		}
	}
}

