"use client"

import { useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import getDuolingoColors from "../../../utils/get-duolingo-colors"

export default function ChallengeProgressCircle({ careerData }: { careerData: CareerData }) {
	const { lessonsComplete, totalLessons, backgroundColor } = careerData
	const [isHovered, setIsHovered] = useState(false)
	const size = 64

	const colors = getDuolingoColors(backgroundColor)
	const radius = 30
	const percentage = totalLessons > 0 ? (lessonsComplete / totalLessons) * 100 : 0
	const circumference = 2 * Math.PI * radius
	const strokeDashoffset = circumference - (percentage / 100) * circumference

	const handleMouseEnter = () => setIsHovered(true)
	const handleMouseLeave = () => setIsHovered(false)

	return (
		<div className={cn("relative inline-flex items-center justify-center cursor-default")}>
			<svg
				width={size}
				height={size}
				className="transform -rotate-90"
			>
				{/* Background circle with hover fill */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth="4"
					fill={isHovered ? "currentColor" : "transparent"}
					className={isHovered ? colors.text1 : colors.text}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
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
					className={colors.border}
					strokeLinecap="round"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			</svg>
			{/* Text overlay */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<span className="text-sm font-semibold text-white">
					{lessonsComplete}/{totalLessons}
				</span>
			</div>
		</div>
	)
}
