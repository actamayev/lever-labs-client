"use client"

import { motion } from "framer-motion"
import { Info, Hourglass } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { getDuolingoColors } from "../../../utils/duolingo-utils"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

export default function BackCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { careerName, careerDescription, backgroundColor } = careerData

	const colors = getDuolingoColors(backgroundColor)

	return (
		<motion.div
			className={cn(
				"absolute w-full h-full backface-hidden flex flex-col",
				colors.bg
			)}
			style={{
				backfaceVisibility: "hidden",
				transform: "rotateY(180deg)",
			}}
		>
			<div className="w-full h-full flex flex-col p-4">
				{/* Header */}
				<h3 className="text-xl font-bold text-white mb-3">{careerName}</h3>

				{/* Description */}
				<div className="flex-1 flex flex-col justify-center">
					<div className="text-sm text-white leading-relaxed text-center">
						{careerDescription}
					</div>
				</div>

				{/* Time estimate */}
				<div className="flex flex-col items-center mt-4">
					<h4 className="text-sm font-medium text-white mb-2">Estimated time:</h4>
					<div className="flex flex-row items-center gap-2">
						<Hourglass className="w-5 h-5 text-white"/>
						<div className="font-medium text-sm text-white">10 hours</div>
					</div>
				</div>
			</div>

			{/* Flip Button */}
			<button
				onClick={flipCard}
				className="absolute top-4 right-4 size-6 rounded-full flex items-center justify-center focus:outline-none duration-0"
			>
				<Info size={20} strokeWidth={2.5} className="text-white"/>
			</button>
		</motion.div>
	)
}
