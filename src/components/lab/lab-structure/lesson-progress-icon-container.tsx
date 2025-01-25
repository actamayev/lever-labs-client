import { ReactElement } from "react"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"

interface Props {
    icon: ReactElement
    progressPercent: number
}

export default function LessonProgressIconContainer({ icon, progressPercent }: Props) {
	// Ensure progress is between 0 and 100
	const progress = Math.min(100, Math.max(0, progressPercent))

	// SVG circle properties
	const size = 50
	const strokeWidth = 2
	const radius = (size - strokeWidth) / 2
	const center = size / 2
	const circumference = 2 * Math.PI * radius

	// Calculate stroke dash offset based on progress
	// Note: We subtract from circumference because we want counter-clockwise
	const strokeDashoffset = circumference - (progress / 100) * circumference

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className="relative inline-flex items-center justify-center">
						{/* Background circle */}
						<svg
							width={size}
							height={size}
							className="absolute"
						>
							<circle
								cx={center}
								cy={center}
								r={radius}
								fill="none"
								stroke="currentColor"
								strokeWidth={strokeWidth}
								className="opacity-10"
							/>
						</svg>

						{/* Progress circle */}
						<svg
							width={size}
							height={size}
							className="absolute transform -rotate-90"
						>
							<circle
								cx={center}
								cy={center}
								r={radius}
								fill="none"
								stroke="rgb(34, 197, 94)"  // Tailwind's green-500
								strokeWidth={strokeWidth}
								strokeLinecap="round"
								strokeDasharray={circumference}
								strokeDashoffset={strokeDashoffset}
								className="transition-all duration-300"
							/>
						</svg>

						{/* Icon */}
						<div className="relative z-10">
							{icon}
						</div>
					</div>
				</TooltipTrigger>
				<TooltipContent side="bottom" className="text-zinc-100 dark:text-zinc-900 mt-2">
					{progressPercent}% complete
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
