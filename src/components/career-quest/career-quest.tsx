"use client"

import { careerData } from "../../utils/career-data"
import WorkbenchLayout from "../workbench/workbench-layout"
import SingleCareerCard from "./single-career-card"

export default function CareerQuest() {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full space-x-6 px-6 pt-12">
			{/* Main content area - 2/3 width */}
			<div className="w-2/3 pt-10">
				<div className="mx-auto max-w-3xl flex flex-col items-center">
					{careerData.map(singleCareerData => (
						<div className="mb-6" key={singleCareerData.careerName}>
							<SingleCareerCard careerData={singleCareerData} />
						</div>
					))}
				</div>
			</div>

			<div className="w-1/3">
				{/* <WorkbenchLayout /> */}
			</div>
		</div>
	)
}
