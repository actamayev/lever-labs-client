"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import CustomTooltip from "../../custom-tooltip"
import ChallengeProgressCircle from "./challenge-progress-circle"
import stopCurrentlyRunningCode from "../../../utils/sandbox/stop-currently-running-code"

export default function CareerQuestActivityHeader({ careerData }: { careerData: CareerQuestData }) {
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
				<h1 className="text-xl font-semibold text-questionText text-center">
					{careerData.careerTitle}
				</h1>
			</div>

			{/* Right section with progress circle */}
			<div className="w-1/4 flex justify-end items-center pr-4">
				<ChallengeProgressCircle careerData={careerData} />
			</div>
		</header>
	)
}
