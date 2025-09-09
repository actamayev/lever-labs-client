"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import getCareerQuestClass from "../../../classes/career-quest-class"

function ChallengeProgressCircle({ careerData } : { careerData: CareerQuestData }): React.ReactNode {
	// Get progress data from career quest class
	const completedChallenges = getCareerQuestClass().getCompletedChallengesForProgress(careerData.careerUUID)
	const totalChallenges = getCareerQuestClass().getTotalChallengesForProgress(careerData.careerUUID)
	const size = 64
	const percentage = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0
	const circumference = 2 * Math.PI * 20 // radius of 20
	const strokeDashoffset = circumference - (percentage / 100) * circumference

	const textColor = useMemo((): string => {
		return `text-${careerData.careerColor}`
	}, [careerData.careerColor])

	if (totalChallenges === 0) return null

	return (
		<div className="relative inline-flex items-center justify-center">
			<svg
				width={size}
				height={size}
				className="transform -rotate-90"
			>
				{/* Background circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={20}
					stroke="currentColor"
					strokeWidth="4"
					fill="transparent"
					className="text-swan"
				/>
				{/* Progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={20}
					stroke="currentColor"
					strokeWidth="4"
					fill="transparent"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					className={cn("transition-all duration-300 ease-in-out", textColor)}
					strokeLinecap="round"
				/>
			</svg>
			{/* Text overlay */}
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-sm font-semibold text-questionText">
					{completedChallenges}/{totalChallenges}
				</span>
			</div>
		</div>
	)
}

export default observer(ChallengeProgressCircle)
