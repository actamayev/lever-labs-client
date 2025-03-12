declare global {
	type ActivityUUID = string & { readonly __brand: unique symbol }

	interface UserActivityProgress {
		status: ProgressStatus
		activityUUID: ActivityUUID
		activityType: ActivityType
		activityName: string
	}

	interface RetrievedQuestions {
		questionText: string
		readingQuestionId: number
		readingQuestionUUID: QuestionUUID
		questionAnswerChoices: {
			answerText: string
			isCorrect: boolean
			explanation: string
			didUserSelectAnswer: boolean
		}[]
	}
}

export {}
