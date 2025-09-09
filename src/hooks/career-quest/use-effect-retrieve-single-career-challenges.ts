import { useEffect } from "react"
import { CareerUUID } from "@bluedotrobots/common-ts/types/utils"
import getAuthClass from "../../classes/auth-class"
import getCareerQuestClass from "../../classes/career-quest-class"
import retrieveCareerQuestChallengeData from "../../utils/career-quest/retrieve-full-career-data"

export default function useEffectRetrieveSingleCareerChallenges(careerUUID: CareerUUID): void {
	useEffect((): void => {
		if (!getCareerQuestClass().isDoneInitializing || !getAuthClass().isFinishedWithSignup) return

		try {
			void retrieveCareerQuestChallengeData(careerUUID)
		} catch (error) {
			console.error("Failed to retrieve challenge data for career:", careerUUID, error)
		}
	}, [careerUUID])
}
