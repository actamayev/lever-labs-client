"use client"

import { CareerQuestData } from "../../utils/career-quest/career-quest-data"
import CareerQuestActivityHeader from "./career-header"
import CareerLayout from "./career-layout"

interface Props {
	careerData: CareerQuestData
}

export default function CareerActivityTemplate(props: Props) {
	const { careerData } = props

	return (
		<div className="flex flex-col h-screen min-h-0">
			<CareerQuestActivityHeader />

			<div className="flex-1 min-h-0 pt-20">
				<CareerLayout careerData={careerData} />
			</div>
		</div>
	)
}
