"use client"

import CareerLayout from "./lesson-layout/career-layout"
import CareerQuestActivityHeader from "./header/career-quest-activity-header"
import useRetrieveSingleChallengeDataUseEffect from "../../utils/career-quest/retrieve-single-challenge-use-effect"

interface Props {
	careerData: CareerQuestData
}

export default function CareerActivityTemplate(props: Props) {
	const { careerData } = props
	useRetrieveSingleChallengeDataUseEffect(careerData.careerUUID)

	return (
		<div className="flex flex-col h-screen min-h-0">
			<CareerQuestActivityHeader careerData={careerData} />

			<div className="flex-1 min-h-0 pt-20">
				<CareerLayout careerData={careerData} />
			</div>
		</div>
	)
}
