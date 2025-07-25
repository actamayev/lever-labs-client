"use client"

import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import CustomTooltip from "../custom-tooltip"
import { TactileButton } from "../shadcn/ui/tactile-button"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"

interface CareerQuestHeaderProps {
	careerTitle: string
	completedSections: number
	totalSections: number
	onChatClick: () => void
	isChatDisabled: boolean
}

export default function CareerQuestHeader({
	careerTitle,
	completedSections,
	totalSections,
	onChatClick,
	isChatDisabled
}: CareerQuestHeaderProps) {
	const progressPercentage = totalSections > 0 ? (completedSections / totalSections) * 100 : 0
	const circumference = 2 * Math.PI * 12 // radius of 12
	const strokeDasharray = circumference
	const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

	return (
		<header className="h-20 flex items-center px-4 shadow-md fixed top-0 left-0 right-0 bg-standardBackground z-10">
			{/* Left section with back button */}
			<div className="w-1/4 flex items-center">
				<CustomTooltip
					tooltipTrigger={
						<Link href="/career-quest">
							<button
								className="flex items-center text-questionText hover:bg-polar p-2 rounded-lg mr-2"
								onClick={() => void stopCurrentlyRunningCode()}
							>
								<ArrowLeft size={30} className="mr-1" />
							</button>
						</Link>
					}
					tooltipContent="CAREER QUEST"
				/>
			</div>

			{/* Center section with career title */}
			<div className="w-1/2 flex justify-center">
				<h1 className="text-xl font-bold text-questionText truncate px-4">
					{careerTitle}
				</h1>
			</div>

			{/* Right section with chat button and progress circle */}
			<div className="w-1/4 flex items-center justify-end gap-3">
				{/* Chat Button */}
				<TactileButton
					onClick={onChatClick}
					disabled={isChatDisabled}
					className={cn(
						"h-10 w-10 p-0 rounded-full text-white",
						isChatDisabled
							? "bg-gray-400 cursor-not-allowed"
							: "bg-macaw hover:bg-macaw/90"
					)}
					shadowColor={isChatDisabled ? "rgb(156, 163, 175)" : "rgb(34, 197, 94)"}
					shadowHeight={4}
				>
					<MessageCircle size={20} />
				</TactileButton>

				{/* Progress Circle */}
				<div className="relative flex items-center justify-center">
					<svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 28 28">
						{/* Background circle */}
						<circle
							cx="14"
							cy="14"
							r="12"
							stroke="rgb(203, 213, 225)" // swan color
							strokeWidth="2"
							fill="transparent"
						/>
						{/* Progress circle */}
						<circle
							cx="14"
							cy="14"
							r="12"
							stroke="rgb(34, 197, 94)" // macaw color
							strokeWidth="2"
							fill="transparent"
							strokeDasharray={strokeDasharray}
							strokeDashoffset={strokeDashoffset}
							strokeLinecap="round"
							className="transition-all duration-300 ease-out"
						/>
					</svg>
					{/* Progress text */}
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-xs font-semibold text-questionText">
							{completedSections}/{totalSections}
						</span>
					</div>
				</div>
			</div>
		</header>
	)
}
