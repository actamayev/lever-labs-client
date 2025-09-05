"use client"

import { CareerUUID } from "@bluedotrobots/common-ts"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import authClass from "../../classes/auth-class"
import teacherClass from "../../classes/teacher-class"
import isNull from "lodash-es/isNull"

export default async function saveCareerProgress(
	careerUUID: CareerUUID,
	currentId: string,
	isFurthestSeen: boolean,
	navigationCommand?: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		await blueDotApiClientClass.careerQuestDataService.updateCareerQuestUserProgress(
			currentId,
			careerUUID,
			isFurthestSeen
		)
		if (isNull(teacherClass.isFocusingStudents)) return

		// Encode navigation command in slideId for backward compatibility
		const slideIdWithCommand = navigationCommand
			? `${navigationCommand}:${currentId}`
			: currentId

		await blueDotApiClientClass.teacherDataService.setHubNewSlideId(
			teacherClass.isFocusingStudents.classCode,
			teacherClass.isFocusingStudents.hubId,
			slideIdWithCommand
		)
	} catch (error) {
		// Silent failure as requested - just log for debugging
		console.error("Failed to save career progress:", error)
	}
}
