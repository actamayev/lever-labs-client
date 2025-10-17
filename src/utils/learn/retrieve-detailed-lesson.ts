"use client"

import isEqual from "lodash-es/isEqual"
import { LessonUUID, QuestionUUID } from "@lever-labs/common-ts/types/utils"
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

		// Only add demo question if this is the first lesson (lessonOrder === 1)
		// let finalQuestionMap: LocalLessonQuestionMap[]

		// if (response.data.lesson.lessonOrder !== 1) {
		// 	// For lessons other than the first, use questions as-is
		// 	finalQuestionMap = existingQuestions
		// } else {
		// 	// Create a demo question to be the first item
		// 	const demoQuestion: LocalQuestion = {
		// 		questionId: "demo-question" as QuestionUUID,
		// 		questionType: "DEMO",
		// 		blockToFunctionFlashcard: null,
		// 		functionToBlockFlashcard: null,
		// 		fillInTheBlank: null,
		// 		userHasAnsweredCorrectly: undefined, // Demo questions start as unanswered
		// 	}

		// 	const demoQuestionMap: LocalLessonQuestionMap = {
		// 		lessonQuestionMapId: -1, // Use negative ID to distinguish from real questions
		// 		order: 0, // First item
		// 		question: demoQuestion,
		// 	}

		// 	// Add demo as first item and adjust order of existing questions
		// 	const adjustedQuestions = existingQuestions.map((q, index): LocalLessonQuestionMap => ({
		// 		...q,
		// 		order: index + 1, // Shift existing questions by 1
		// 	}))

		// 	finalQuestionMap = [demoQuestionMap, ...adjustedQuestions]
		// }

		// Set the complete lesson data (basic + detailed) from the response
		learnClass.setSingleLesson({
			...response.data.lesson,
			lessonQuestionMap: existingQuestions,
			isRetrievingDetailedData: false,
			hasRetrievedDetailedData: true,
			numberQuestionsCorrect: 0, // Start with 0, demo will increment when passed
		})
	} catch (error) {
		console.error(error)
		learnClass.setIsRetrievingDetailedData(lessonId, false)
	}
}
