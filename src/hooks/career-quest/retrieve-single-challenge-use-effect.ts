import { useEffect } from "react"
import { CareerUUID } from "@bluedotrobots/common-ts"
import careerQuestClass from "../../classes/career-quest-class"
import retrieveCareerQuestChallengeData from "../../utils/career-quest/retrieve-career-quest-challenge-data"

export default function useRetrieveSingleChallengeDataUseEffect(careerUUID: CareerUUID): void {
	useEffect(() => {
		if (!careerQuestClass.isDoneInitializing) return
		const challengeSections = careerQuestClass.getChallengeSectionByChallengeUUID(careerUUID)
		const retrievalPromises = challengeSections.map(section =>
			retrieveCareerQuestChallengeData(section.challengeData)
		)

		try {
			void Promise.all(retrievalPromises)
		} catch (error) {
			console.error("Failed to retrieve challenge data for career:", careerUUID, error)
		}
	}, [careerUUID])
}
