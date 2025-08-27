"use client"

import { observer } from "mobx-react"
import { Particles } from "../magicui/particles"
import CareerLayout from "./lesson-layout/career-layout"
import personalInfoClass from "../../classes/personal-info-class"
import CareerQuestActivityHeader from "./header/career-quest-activity-header"
import useEffectRetrieveSingleCareerChallenges from "../../hooks/career-quest/use-effect-retrieve-single-career-challenges"

interface Props {
	careerData: CareerQuestData
}

function CareerActivityTemplate(props: Props) {
	const { careerData } = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	useEffectRetrieveSingleCareerChallenges(careerData.careerUUID)

	return (
		<div className="flex flex-col h-screen min-h-0">
			<CareerQuestActivityHeader careerData={careerData} />

			<div className="flex-1 min-h-0 pt-20 bg-black">
				<CareerLayout careerData={careerData} />
			</div>

			{/* // <div className="relative flex-1 min-h-0 pt-20 overflow-hidden">
			// 	<Particles
			// 		className="absolute inset-0 z-0"
			// 		quantity={100}
			// 		ease={80}
			// 		color={isDarkMode ? "#ffffff" : "#000000"}
			// 		refresh
			// 	/>
			// 	<div className="relative z-10">
			// 		<CareerLayout careerData={careerData} />
			// 	</div>
			// </div> */}
		</div>
	)
}

export default observer(CareerActivityTemplate)
