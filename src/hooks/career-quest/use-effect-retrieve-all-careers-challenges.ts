import { useEffect } from "react"
import authClass from "../../classes/auth-class"
import getCareerQuestClass from "../../classes/career-quest-class"
import retrieveCareerQuestChallengeData from "../../utils/career-quest/retrieve-full-career-data"

export default function useEffectRetrieveAllCareersChallenges(): void {
	useEffect((): void => {
		if (!getCareerQuestClass().isDoneInitializing || !authClass.isFinishedWithSignup) return

		getCareerQuestClass().careers.forEach((career): void => {
			try {
				void retrieveCareerQuestChallengeData(career.careerDefinition.careerUUID)
			} catch (error) {
				console.error("Failed to retrieve challenge data for career:", career.careerDefinition.careerUUID, error)
			}
		})
	}, [])
}
