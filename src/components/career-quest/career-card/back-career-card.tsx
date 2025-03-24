/* eslint-disable max-len */
"use client"

import { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"

interface Props {
	careerData: CareerData
	setFlipped: Dispatch<SetStateAction<boolean>>
}

export default function SingleCareerCard(props: Props) {
	const { careerData, setFlipped } = props
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

			{/* Flip back button */}
			<button
				onClick={() => setFlipped(false)}
				className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 focus:outline-none duration-0"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
			</button>
		</motion.div>
	)
}
