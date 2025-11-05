"use client"

import isEqual from "lodash-es/isEqual"
import { LessonUUID } from "@lever-labs/common-ts/types/utils"
import { isErrorResponses } from "../type-checks"
import learnClass from "../../classes/learn-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import authClass from "../../classes/auth-class"

export default async function retrieveDetailedLesson(lessonId: LessonUUID): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			learnClass.isRetrievingDetailedData(lessonId) ||
			learnClass.hasRetrievedDetailedData(lessonId)
		) return

		learnClass.setIsRetrievingDetailedData(lessonId, true)

		const response = await leverLabsApiClient.learnDataService.getDetailedLesson(lessonId)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw Error("Unable to retrieve lesson details")
		}

		// Get existing questions
		const existingQuestions = response.data.lesson.lessonQuestionMap || []

		// Filter to only ACTION_TO_CODE_MULTIPLE_CHOICE questions and take first two
		// const filteredQuestions = existingQuestions
		// .filter(q => q.question.questionType === "FILL_IN_BLANK")
		// .filter(q => q.question.questionId === "09c540bd-8069-4765-99d8-a56f5cb51a83" as QuestionUUID)
		// .slice(0, 2)

		// Set the complete lesson data (basic + detailed) from the response
		learnClass.setSingleLesson({
			...response.data.lesson,
			lessonQuestionMap: existingQuestions,
			isRetrievingDetailedData: false,
			hasRetrievedDetailedData: true,
			numberQuestionsCorrect: 0, // Start with 0, demo will increment when passed
			numberQuestionsCorrectFirstTry: 0, // Start with 0, will increment for first-try correct answers
		})
	} catch (error) {
		console.error(error)
		learnClass.setIsRetrievingDetailedData(lessonId, false)
	}
}
