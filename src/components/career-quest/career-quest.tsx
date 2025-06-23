"use client"

import WorkbenchLayout from "../layouts/workbench-layout"
import SingleCareerCard from "./career-card/single-career-card"
import IntroductionCard from "./introduction-card/introduction-card"
import { introductionData, careerData } from "../../utils/constants/career-quest/career-data"

export default function CareerQuest() {
	return (
		<WorkbenchLayout extraChildrenClasses="p-10">
			<div className="flex flex-col">
				<IntroductionCard introData={introductionData} />
			</div>

			<h2 className="text-3xl font-bold text-center my-4">Careers</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
				{careerData.map(singleCareerData => (
					<div key={singleCareerData.careerName}>
						<SingleCareerCard careerData={singleCareerData} />
					</div>
				))}
			</div>
		</WorkbenchLayout>
	)
}
