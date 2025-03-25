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
	const { careerName, backgroundColor } = careerData

	return (
		<motion.div
			className={cn(
				"absolute w-full h-full backface-hidden flex",
				backgroundColor
			)}
			style={{
				backfaceVisibility: "hidden",
				transform: "rotateY(180deg)",
			}}
		>
			<div className="w-1/2 flex flex-col p-6 justify-between">
				<h3 className="text-2xl font-bold">{careerName}</h3>
			</div>
			<div className="w-1/2 flex items-center justify-center">
			</div>

			<BackFlipButton onFlip={flipCard} />
		</motion.div>
	)
}
