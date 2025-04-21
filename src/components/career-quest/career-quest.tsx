"use client"

import { careerData } from "../../utils/career-data"
import WorkbenchLayout from "../layouts/workbench-layout"
import SingleCareerCard from "./career-card/single-career-card"

export default function CareerQuest() {
	return (
		<WorkbenchLayout>
			{careerData.map(singleCareerData => (
				<div className="mb-12 flex flex-col items-center" key={singleCareerData.careerName}>
					<SingleCareerCard careerData={singleCareerData} />
				</div>
			))}
		</WorkbenchLayout>
	)
}
