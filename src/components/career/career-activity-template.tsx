"use client"

import { observer } from "mobx-react"
import { Particles } from "../magicui/particles"
import CareerLayout from "./lesson-layout/career-layout"
import personalInfoClass from "../../classes/personal-info-class"
import careerQuestClass from "../../classes/career-quest-class"
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

	// Ensure careers are initialized on mount
	if (!careerQuestClass.isDoneInitializing) {
		careerQuestClass.reinitialize()
	}

	// Wait for careers to be initialized before rendering
	if (!careerQuestClass.isDoneInitializing) {
		return (
			<div className="flex flex-col h-screen min-h-0 bg-standardBackground">
				<div className="h-20 flex items-center px-4 shadow-sm bg-standardBackground border-b-2 border-swan">
					<div className="w-1/4 flex items-center">
						<div className="bg-swan animate-pulse rounded h-8 w-8 mr-2"></div>
					</div>
					<div className="w-1/2 flex justify-center">
						<div className="bg-swan animate-pulse rounded h-12 w-64"></div>
					</div>
					<div className="w-1/4 flex justify-end items-center pr-4 gap-2">
						<div className="bg-swan animate-pulse rounded h-8 w-8"></div>
					</div>
				</div>
				<div className="relative flex-1 min-h-0 pt-20 overflow-hidden">
					<Particles
						className="absolute inset-0"
						quantity={100}
						ease={80}
						color={isDarkMode ? "#ffffff" : "#000000"}
						refresh
					/>
					<div className="flex items-center justify-center h-full">
						<div className="text-center">
							<div className="bg-swan animate-pulse rounded h-6 w-48 mb-4"></div>
							<div className="bg-swan animate-pulse rounded h-4 w-32"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}

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
