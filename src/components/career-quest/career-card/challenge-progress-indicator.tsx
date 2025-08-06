"use client"

import { useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import CustomTooltip from "../../custom-tooltip"

export default function ChallengeProgressCircle({ careerData }: { careerData: CareerData }) {
	const { lessonsComplete, totalLessons, backgroundColor } = careerData
	const [isHovered, setIsHovered] = useState(false)
	const size = 64

	const colors = getDuolingoColors(backgroundColor)
	const radius = 30
	const percentage = totalLessons > 0 ? (lessonsComplete / totalLessons) * 100 : 0
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
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						/>
					}
					tooltipContent={`${lessonsComplete}/${totalLessons} lessons complete`}
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
