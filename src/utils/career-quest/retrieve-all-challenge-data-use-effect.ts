import { useEffect } from "react"
import careerQuestClass from "../../classes/career-quest-class"
import retrieveCareerQuestChallengeData from "./retrieve-career-quest-challenge-data"

export default function useRetrieveAllChallengeDataUseEffect(): void {
	useEffect(() => {
		if (!careerQuestClass.isDoneInitializing) return
		careerQuestClass.careers.forEach(career => {
			const challengeSections = careerQuestClass.getAllChallengeSections(career.careerDefinition.sections)

			const retrievalPromises = challengeSections.map(section =>
				retrieveCareerQuestChallengeData(section.challengeData)
			)

			try {
				void Promise.all(retrievalPromises)
			} catch (error) {
				console.error("Failed to retrieve challenge data for career:", career.careerDefinition.careerUUID, error)
			}
		})
	}, [])
}
