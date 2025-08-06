"use client"

import { cn } from "../../../lib/shadcn/utils"
import getDuolingoColors from "../../../utils/get-duolingo-colors"

export default function ChallengeProgressCircle({ careerData }: { careerData: CareerData }) {
	const { lessonsComplete, totalLessons, backgroundColor } = careerData
	const size = 64

	const colors = getDuolingoColors(backgroundColor)
	const radius = 30
	const percentage = totalLessons > 0 ? (lessonsComplete / totalLessons) * 100 : 0
	const circumference = 2 * Math.PI * radius
	const strokeDashoffset = circumference - (percentage / 100) * circumference

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
					r={radius}
					stroke="currentColor"
					strokeWidth="4"
					fill="transparent"
					className={cn(colors.text)}
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
					className={cn("transition-all duration-300 ease-in-out", colors.border)}
					strokeLinecap="round"
				/>
			</svg>
			{/* Text overlay */}
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-sm font-semibold text-white">
					{lessonsComplete}/{totalLessons}
				</span>
			</div>
		</div>
	)
}
