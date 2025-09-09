"use client"

import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import getAuthClass from "../../classes/auth-class"
import getTeacherClass from "../../classes/teacher-class"
import isNull from "lodash-es/isNull"

export default async function saveCareerProgress(
	careerUUID: CareerUUID,
	currentId: string,
	isFurthestSeen: boolean,
	navigationCommand?: string
): Promise<void> {
	try {
		if (getAuthClass().isFinishedWithSignup === false) return
		await getBlueDotApiClientClass().careerQuestDataService.updateCareerQuestUserProgress(
			currentId,
			careerUUID,
			isFurthestSeen
		)
		if (isNull(getTeacherClass().isFocusingStudents)) return

		// Encode navigation command in slideId for backward compatibility
		const slideIdWithCommand = navigationCommand
			? `${navigationCommand}:${currentId}`
			: currentId

		await getBlueDotApiClientClass().teacherDataService.setHubNewSlideId(
			getTeacherClass().isFocusingStudents.classCode,
			getTeacherClass().isFocusingStudents.hubId,
			slideIdWithCommand
		)
	} catch (error) {
		// Silent failure as requested - just log for debugging
		console.error("Failed to save career progress:", error)
	}
}
