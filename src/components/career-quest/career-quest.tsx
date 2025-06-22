"use client"

import WorkbenchLayout from "../layouts/workbench-layout"
import SingleCareerCard from "./career-card/single-career-card"
import IntroductionCard from "./introduction-card/introduction-card"
import { introductionData, careerData } from "../../utils/constants/career-quest/career-data"

export default function CareerQuest() {
	return (
		<WorkbenchLayout extraChildrenClasses="p-10">
			{/* Introduction Section */}
			<div className="flex flex-col items-center">
				<IntroductionCard introData={introductionData} />
			</div>

			{/* Challenges Section */}
			<div className="">
				<h2 className="text-3xl font-bold text-center my-4">Careers</h2>

				{/* 2-column grid for challenge cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{careerData.map(singleCareerData => (
						<div key={singleCareerData.careerName} className="flex justify-center">
							<SingleCareerCard careerData={singleCareerData} />
						</div>
					))}
				</div>
			</div>
		</WorkbenchLayout>
	)
}
