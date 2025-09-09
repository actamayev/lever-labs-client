import { useEffect } from "react"
import getAuthClass from "../../classes/auth-class"
import getCareerQuestClass from "../../classes/career-quest-class"
import retrieveCareerQuestChallengeData from "../../utils/career-quest/retrieve-full-career-data"

export default function useEffectRetrieveAllCareersChallenges(): void {
	useEffect((): void => {
		if (!getCareerQuestClass().isDoneInitializing || !getAuthClass().isFinishedWithSignup) return

		getCareerQuestClass().careers.forEach((career): void => {
			try {
				void retrieveCareerQuestChallengeData(career.careerDefinition.careerUUID)
			} catch (error) {
				console.error("Failed to retrieve challenge data for career:", career.careerDefinition.careerUUID, error)
			}
		})
	}, [])
}
