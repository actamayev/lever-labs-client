"use client"

import { useState } from "react"
import { observer } from "mobx-react"
import { CareerUUID } from "@lever-labs/common-ts/types/utils"
import { cn } from "../../../lib/shadcn/utils"
import CustomTooltip from "../../custom-tooltip"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import careerQuestClass from "../../../classes/career-quest-class"
import { careerData } from "../../../utils/constants/career-quest/career-data"

function ChallengeProgressCircle({ careerUUID }: { careerUUID: CareerUUID }): React.ReactNode {
	const [isHovered, setIsHovered] = useState(false)
	const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === careerUUID)
	if (!career) return null
	const completedChallenges = careerQuestClass.getCompletedChallengesForProgress(careerUUID)
	const totalChallenges = careerQuestClass.getTotalChallengesForProgress(careerUUID)
	const size = 64

	const colors = getDuolingoColors(career.backgroundColor)
	const radius = 30
	const percentage = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0
	const circumference = 2 * Math.PI * radius
	const strokeDashoffset = circumference - (percentage / 100) * circumference

	return (
		<div className={cn("relative inline-flex items-center justify-center")}>
			<svg
				width={size}
				height={size}
				className="transform -rotate-90"
			>
				{/* Background circle with hover fill */}
				<CustomTooltip
					tooltipTrigger={
						<circle
							cx={size / 2}
							cy={size / 2}
							r={radius}
							stroke="currentColor"
							strokeWidth="4"
							fill={isHovered ? "currentColor" : "transparent"}
							className={cn("duration-0 cursor-default", colors.text)}
							onMouseEnter={(): void => setIsHovered(true)}
							onMouseLeave={(): void => setIsHovered(false)}
						/>
					}
					tooltipContent={`${completedChallenges}/${totalChallenges} challenges complete`}
				/>
				{/* Progress circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth="4"
					fill="transparent"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					className={cn("duration-0 pointer-events-none", colors.border)}
					strokeLinecap="round"
				/>
			</svg>
			{/* Text overlay */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<span className="text-sm font-semibold text-white">
					{percentage.toFixed(0)}%
				</span>
			</div>
		</div>
	)
}

export default observer(ChallengeProgressCircle)
