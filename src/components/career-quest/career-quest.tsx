"use client"

import SingleCareerCard from "./single-career-card"
import { careerData } from "../../utils/career-data"
import WorkbenchIcons from "../workbench/workbench-icons"

export default function CareerQuest() {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full space-x-6 px-6 pt-12">
			{/* Main content area - 2/3 width */}
			<div className="w-full lg:w-3/5 xl:w-[61.8%]">
				{careerData.map(singleCareerData => (
					<div className="mb-6 flex flex-col items-center" key={singleCareerData.careerName}>
						<SingleCareerCard careerData={singleCareerData} />
					</div>
				))}
			</div>

			<div className="w-full lg:w-2/5 xl:w-[38.2%] mt-8 lg:mt-0 space-y-4">
				<WorkbenchIcons />
			</div>
		</div>
	)
}
