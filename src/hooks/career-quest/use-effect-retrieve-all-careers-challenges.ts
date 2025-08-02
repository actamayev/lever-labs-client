import { useEffect } from "react"
import careerQuestClass from "../../classes/career-quest-class"
import retrieveCareerQuestChallengeData from "../../utils/career-quest/retrieve-full-career-data"

export default function useEffectRetrieveAllCareersChallenges(): void {
	useEffect(() => {
		if (!careerQuestClass.isDoneInitializing) return

		careerQuestClass.careers.forEach(career => {
			try {
				void retrieveCareerQuestChallengeData(career.careerDefinition.careerUUID)
			} catch (error) {
				console.error("Failed to retrieve challenge data for career:", career.careerDefinition.careerUUID, error)
			}
		})
	}, [])
}
