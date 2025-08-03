"use client"

import { CareerUUID } from "@bluedotrobots/common-ts"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function saveCareerProgress(
	careerUUID: CareerUUID,
	currentId: string,
	isLocked: boolean
): Promise<void> {
	try {
		await blueDotApiClientClass.careerQuestDataService.updateCareerQuestUserProgress(
			currentId,
			careerUUID,
			isLocked
		)
	} catch (error) {
		// Silent failure as requested - just log for debugging
		console.error("Failed to save career progress:", error)
	}
}
