import { LessonQuestionMap, Question, Lesson, QuestionType, CodingBlock } from "@lever-labs/common-ts/types/quest"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"

declare global {
	interface LocalQuestion extends Omit<Question, "questionType"> {
		userHasAnsweredCorrectly?: boolean
		questionType: QuestionType
		fillInBlankAnswer?: {
			initialJson: BlocklyJson
			blocklyJson: BlocklyJson
			cppCode: string
		}
		// Server-provided feedback for fill-in-the-blank submissions
		fillInBlankFeedback?: string
		actionToCodeOpenEndedAnswer?: {
			initialJson: BlocklyJson
			blocklyJson: BlocklyJson
			cppCode: string
		}
		// Server-provided feedback for action-to-code-open-ended submissions
		actionToCodeOpenEndedFeedback?: string
		// Server-provided correct answer choice ID for multiple choice questions
		correctAnswerChoiceId?: number
		// Matching question client-side state
		matchingAnswerState?: {
			// Currently selected coding block ID (left side)
			selectedCodingBlockId: number | null
			// Currently selected matching answer choice text ID (right side)
			selectedMatchingAnswerId: number | null
			// Map of match results: key format is "codingBlockId-matchingAnswerChoiceTextId"
			// Value: true = correct, false = incorrect, undefined = not yet matched
			matchResults: Record<string, boolean>
			// Track which coding block IDs have been correctly matched (for disabling)
			correctlyMatchedBlockIds: number[]
			// Track which matching answer choice text IDs have been correctly matched (for disabling)
			correctlyMatchedChoiceIds: number[]
			// Shuffled order of coding blocks (left side) - stored to ensure consistency between component and keyboard handler
			shuffledCodingBlocks?: CodingBlock[]
			// Shuffled order of matching answer choices (right side) - stored to ensure consistency between component and keyboard handler
			shuffledMatchingChoices?: MatchingTextChoice[]
		}
	}

	interface LocalLessonQuestionMap extends Omit<LessonQuestionMap, "question"> {
		question: LocalQuestion
	}

	interface LocalLesson extends Lesson {
		isRetrievingDetailedData: boolean
		hasRetrievedDetailedData: boolean
		lessonQuestionMap?: LocalLessonQuestionMap[]
		numberQuestionsCorrect: number
		numberQuestionsCorrectFirstTry: number
	}

	interface CurrentQuestionState {
		question: LocalQuestion
		selectedAnswerId: number | null
		currentQuestionIndex: number
		totalQuestions: number
		questionOrder: number[]
		currentOrderPosition: number
		originalQuestionCount: number
	}

	interface SubmitMCQResponse {
		isCorrect: boolean
		correctAnswerChoiceId?: number
	}

	interface MatchingTextChoice {
		matchingAnswerChoiceTextId: number
		text: string
	}
}

export {}
