"use client"

import { motion } from "framer-motion"
import { Hourglass } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import { CAREER_QUEST_CARD_ROUNDING_RADIUS } from "../../../utils/constants/constants"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

export default function BackCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { careerName, careerDescription, backgroundColor, expectedCompletionTime } = careerData

	const colors = getDuolingoColors(backgroundColor)

	return (
		<motion.div
			className={cn(
				"absolute w-full h-full backface-hidden flex flex-col",
				colors.bg
			)}
			style={{
				backfaceVisibility: "hidden",
				borderRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS,
				transform: "rotateY(180deg)",
			}}
		>
			<div className="w-full h-full flex flex-col p-4">
				<h3 className="text-xl font-bold text-white mb-3">{careerName}</h3>

				<div className="flex-1 flex flex-col justify-center">
					<div className="text-sm text-white leading-relaxed text-center">
						{careerDescription}
					</div>
				</div>

				<div className="flex flex-row items-center justify-between mt-4 h-10">
					<div className="flex flex-row items-center gap-2">
						<Hourglass className="w-5 h-5 text-white"/>
						<div className="text-sm text-white">
							<span className="font-medium">{expectedCompletionTime}</span>
						</div>
					</div>

					<BackFlipButton
						onFlip={flipCard}
						extraClasses="size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
					/>
				</div>
			</div>
		</motion.div>
	)
}
