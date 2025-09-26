"use client"

import { useEffect } from "react"
import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import authClass from "../../classes/auth-class"
import careerQuestClass from "../../classes/career-quest-class"
import retrieveCareerQuestChallengeData from "../../utils/career-quest/retrieve-full-career-data"

export default function useEffectRetrieveSingleCareerChallenges(careerUUID: CareerUUID): void {
	useEffect((): void => {
		if (!careerQuestClass.isDoneInitializing || !authClass.isFinishedWithSignup) return

		try {
			void retrieveCareerQuestChallengeData(careerUUID)
		} catch (error) {
			console.error("Failed to retrieve challenge data for career:", careerUUID, error)
		}
	}, [careerUUID	])
}
