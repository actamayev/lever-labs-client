"use client"

import { motion } from "framer-motion"
import { Hourglass } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import { Separator } from "../../shadcn/ui/separator"
import SingleComponentUsed from "../single-component-used"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import { CAREER_QUEST_CARD_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import { meetPipData } from "../../../utils/constants/career-quest/career-data"

export default function BackMeetPipCard({ flipCard } : {flipCard: () => void}): React.ReactNode {
	const {
		careerName,
		careerDescription,
		backgroundColor,  // This is now a DuolingoColors type
		componentsUsed,
		expectedCompletionTime
	} = meetPipData

	// Generate color classes
	const colors = getDuolingoColors(backgroundColor)

	return (
		<motion.div
			className={cn(
				"absolute w-full h-full backface-hidden flex",
				colors.bg  // bg-humpback, bg-beetle, etc.
			)}
			style={{
				backfaceVisibility: "hidden",
				transform: "rotateY(180deg)",
				borderRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS
			}}
		>
			<div className="w-full flex flex-col p-6">
				<h3 className="text-2xl font-bold text-white">{careerName}</h3>
				<div className="text-base my-4 text-white">
					{careerDescription}
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex flex-col items-center w-1/3 px-2">
						<h3 className="text-base font-medium text-center mb-3 text-white">
							Components
						</h3>
						<div className="grid grid-cols-3 gap-2 w-full">
							{componentsUsed.slice(0, 5).map((componentName): React.ReactNode => (
								<SingleComponentUsed
									key={componentName}
									componentName={componentName}
									baseColor={backgroundColor}
								/>
							))}
							{componentsUsed.length > 5 && (
								<div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", colors.bg2)}>
									<span className="font-bold text-white">+{componentsUsed.length - 5}</span>
								</div>
							)}
						</div>
					</div>

					<Separator orientation="vertical" className="bg-white rounded-2xl h-auto w-[2px]"/>

					<div className="flex flex-col items-center justify-center w-1/3 px-2">
						<div className="flex flex-row items-center gap-2 mt-2">
							<Hourglass className="w-6 h-6 text-white"/>
							<div className="font-medium text-base text-white">{expectedCompletionTime}</div>
						</div>
					</div>
				</div>
			</div>

			<BackFlipButton
				onFlip={flipCard}
				extraClasses="absolute bottom-6 right-6 size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
			/>
		</motion.div>
	)
}
