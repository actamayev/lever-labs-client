"use client"

import { careerData } from "../../utils/career-data"
import WorkbenchLayout from "../workbench/workbench-layout"
import SingleCareerCard from "./single-career-card"

export default function CareerQuest() {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full">
			{/* Main content area - 2/3 width */}
			<div className="w-3/5 p-4">
				{careerData.map(singleCareerData => (
					<SingleCareerCard
						key={singleCareerData.careerName}
						careerData={singleCareerData}
					/>
				))}
			</div>

			<div className="w-2/5 pr-28 pt-12">
				{/* <WorkbenchLayout /> */}
			</div>
		</div>
	)
}
