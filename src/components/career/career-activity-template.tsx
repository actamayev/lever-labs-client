"use client"

import { observer } from "mobx-react"
import { Particles } from "../magicui/particles"
import CareerLayout from "./lesson-layout/career-layout"
import personalInfoClass from "../../classes/personal-info-class"
import CareerQuestActivityHeader from "./header/career-quest-activity-header"
import useEffectRetrieveSingleCareerChallenges from "../../hooks/career-quest/use-effect-retrieve-single-career-challenges"
import useEffectSetSelectedPipFirstPip from "../../hooks/pip/use-effect-set-selected-pip-first-pip"

interface Props {
	careerData: CareerQuestData
}

function CareerActivityTemplate(props: Props): React.ReactNode {
	const { careerData } = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	useEffectRetrieveSingleCareerChallenges(careerData.careerUUID)
	useEffectSetSelectedPipFirstPip()

	return (
		<div className="flex flex-col h-screen min-h-0">
			<CareerQuestActivityHeader careerData={careerData} />

			<div className="relative flex-1 min-h-0 pt-20 overflow-hidden">
				<Particles
					className="absolute inset-0"
					quantity={100}
					ease={80}
					color={isDarkMode ? "#ffffff" : "#000000"}
					refresh
				/>
				<CareerLayout careerData={careerData} />
			</div>
		</div>
	)
}

export default observer(CareerActivityTemplate)
