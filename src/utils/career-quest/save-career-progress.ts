"use client"

import { CareerUUID } from "@bluedotrobots/common-ts"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import authClass from "../../classes/auth-class"

export default async function saveCareerProgress(
	careerUUID: CareerUUID,
	currentId: string
): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		await blueDotApiClientClass.careerQuestDataService.updateCareerQuestUserProgress(
			currentId,
			careerUUID
		)
	} catch (error) {
		// Silent failure as requested - just log for debugging
		console.error("Failed to save career progress:", error)
	}
}
