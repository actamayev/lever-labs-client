"use client"

import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
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
		await blueDotApiClient.careerQuestDataService.updateCareerQuestUserProgress(
			currentId,
			careerUUID,
			isFurthestSeen
		)
		const isFocusingStudents = teacherClass.isFocusingStudents
		if (isNull(isFocusingStudents)) return

		// Encode navigation command in slideId for backward compatibility
		const slideIdWithCommand = navigationCommand
			? `${navigationCommand}:${currentId}`
			: currentId

		await blueDotApiClient.teacherDataService.setHubNewSlideId(
			isFocusingStudents.classCode,
			isFocusingStudents.hubId,
			slideIdWithCommand
		)
	} catch (error) {
		// Silent failure as requested - just log for debugging
		console.error("Failed to save career progress:", error)
	}
}
