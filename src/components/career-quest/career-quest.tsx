"use client"

import { careerData } from "../../utils/career-data"
import Workbench from "../workbench/workbench"
import SingleCareerCard from "./career-card/single-career-card"

export default function CareerQuest() {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full space-x-12 px-10 pt-12">
			{/* Main content area */}
			<div className="w-full lg:w-3/5 xl:w-[61.8%]">
				{careerData.map(singleCareerData => (
					<div className="mb-12 flex flex-col items-center" key={singleCareerData.careerName}>
						<SingleCareerCard careerData={singleCareerData} />
					</div>
				))}
			</div>

			<Workbench />
		</div>
	)
}
