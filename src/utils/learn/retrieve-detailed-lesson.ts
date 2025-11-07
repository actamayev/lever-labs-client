"use client"

import isEqual from "lodash-es/isEqual"
import { LessonUUID, QuestionUUID } from "@lever-labs/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import { isErrorResponses } from "../type-checks"
import learnClass from "../../classes/learn-class"
import { initializeMatchingQuestionShuffles } from "./shuffle"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

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
		const existingQuestions = response.data.lesson.lessonQuestionMap

		// Initialize shuffled arrays for matching questions
		initializeMatchingQuestionShuffles(existingQuestions)

		// Filter to only ACTION_TO_CODE_MULTIPLE_CHOICE questions and take first two
		// const filteredQuestions = existingQuestions
		// .filter(q => q.question.questionType === "FILL_IN_BLANK")
		// .filter(q => q.question.questionId === "26a7b901-784a-4ab6-9641-aa9141233677" as QuestionUUID)
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
