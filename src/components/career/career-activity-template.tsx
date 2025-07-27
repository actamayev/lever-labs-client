"use client"

import CareerLayout from "./career-layout"
import { CareerQuestData } from "../../utils/career-quest/career-quest-data"
import CareerQuestActivityHeader from "./header/career-quest-activity-header"

interface Props {
	careerData: CareerQuestData
}

export default function CareerActivityTemplate(props: Props) {
	const { careerData } = props

	return (
		<div className="flex flex-col h-screen min-h-0">
			<CareerQuestActivityHeader careerData={careerData} />

			<div className="flex-1 min-h-0 pt-20">
				<CareerLayout careerData={careerData} />
			</div>
		</div>
	)
}
