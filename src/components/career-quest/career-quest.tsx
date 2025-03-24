"use client"

import SingleCareerCard from "./career-card/single-career-card"
import { careerData } from "../../utils/career-data"
import WorkbenchIcons from "../workbench/workbench-icons"

export default function CareerQuest() {
	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full space-x-12 px-6 pt-12">
			{/* Main content area - 2/3 width */}
			<div className="w-full lg:w-3/5 xl:w-[61.8%]">
				{careerData.map(singleCareerData => (
					<div className="mb-12 flex flex-col items-center" key={singleCareerData.careerName}>
						<SingleCareerCard careerData={singleCareerData} />
					</div>
				))}
			</div>

			{/* Fixed workbench icons */}
			<div className="hidden lg:block lg:w-2/5 xl:w-[38.2%]">
				{/* This div takes up space in the layout */}
				<div className="w-full" style={{ height: "1px" }}></div>

				{/* This is the fixed element */}
				<div className="fixed top-9" style={{ width: "inherit", maxWidth: "inherit" }}>
					<WorkbenchIcons />
				</div>
			</div>
		</div>
	)
}
