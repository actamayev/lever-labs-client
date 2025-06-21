"use client"

import { introductionData, challengeData } from "../../utils/constants/career-quest/career-data"
import WorkbenchLayout from "../layouts/workbench-layout"
import IntroductionCard from "./introduction-card/introduction-card"
import SingleChallengeCard from "./career-card/single-career-card"

export default function CareerQuest() {
	return (
		<WorkbenchLayout extraChildrenClasses="p-10">
			{/* Introduction Section */}
			<div className="flex flex-col items-center">
				<IntroductionCard introData={introductionData} />
			</div>

			{/* Challenges Section */}
			<div className="my-4">
				<h2 className="text-3xl font-bold text-center mb-8">Challenges</h2>

				{/* 2-column grid for challenge cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{challengeData.map(singleChallengeData => (
						<div key={singleChallengeData.careerName} className="flex justify-center">
							<SingleChallengeCard careerData={singleChallengeData} />
						</div>
					))}
				</div>
			</div>
		</WorkbenchLayout>
	)
}
