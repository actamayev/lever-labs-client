"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "./back-flip-button"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

export default function BackCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { backgroundColor } = careerData

	return (
		<motion.div
			className={cn(
				"absolute w-full h-full backface-hidden flex items-center justify-center",
				backgroundColor
			)}
			style={{
				backfaceVisibility: "hidden",
				transform: "rotateY(180deg)",
			}}
		>
			{/* Simple back content */}
			<div className="text-center">
				{/* You can add back content here later */}
			</div>

			<BackFlipButton onFlip={flipCard} />
		</motion.div>
	)
}
