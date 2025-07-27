"use client"

import { observer } from "mobx-react"

interface ChallengeProgressCircleProps {
	completed: number
	total: number
	size?: number
}

function ChallengeProgressCircle({ completed, total, size = 64 }: ChallengeProgressCircleProps) {
	const percentage = total > 0 ? (completed / total) * 100 : 0
	const circumference = 2 * Math.PI * 20 // radius of 20
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
					className="text-macaw transition-all duration-300 ease-in-out"
					strokeLinecap="round"
				/>
			</svg>
			{/* Text overlay */}
			<div className="absolute inset-0 flex items-center justify-center">
				<span className="text-sm font-semibold text-questionText">
					{completed}/{total}
				</span>
			</div>
		</div>
	)
}

export default observer(ChallengeProgressCircle)
