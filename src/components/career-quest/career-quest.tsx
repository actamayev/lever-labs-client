"use client"

import { careerData } from "../../utils/career-data"
import TopWorkbenchIcons from "../workbench/top-workbench/top-workbench-icons"
import WorkbenchLayout from "../workbench/workbench-layout"
import SingleCareerCard from "./single-career-card"

export default function CareerQuest() {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full space-x-6 px-6">
			{/* Main content area - 2/3 width */}
			<div className="w-3/5 pt-7">
				<div className="mx-auto max-w-3xl flex flex-col items-center">
					{careerData.map(singleCareerData => (
						<div className="mb-6" key={singleCareerData.careerName}>
							<SingleCareerCard careerData={singleCareerData} />
						</div>
					))}
				</div>
			</div>

			<div className="w-full lg:w-2/5 mt-8 lg:mt-0 lg:pr-6 xl:pr-12 2xl:pr-52 space-y-4 pt-5">
				<TopWorkbenchIcons />
				<WorkbenchLayout />
			</div>
		</div>
	)
}
