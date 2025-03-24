/* eslint-disable max-len */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import FrontCareerCard from "./front-career-card"
import BackCareerCard from "./back-career-card"

// eslint-disable-next-line max-lines-per-function
export default function SingleCareerCard({ careerData }: { careerData: CareerData }) {
	const [flipped, setFlipped] = useState(false)

	return (
		<div className={cn(
			"relative overflow-hidden rounded-2xl text-white",
			"w-[100%] aspect-[750/321]",
		)}>
			{/* Card container */}
			<motion.div
				className="w-full h-full relative preserve-3d"
				animate={{ rotateY: flipped ? 180 : 0 }}
				transition={{ duration: 0.7 }}
				style={{
					transformStyle: "preserve-3d",
				}}
			>
				<FrontCareerCard
					careerData={careerData}
					setFlipped={setFlipped}
				/>

				<BackCareerCard
					careerData={careerData}
					setFlipped={setFlipped}
				/>
			</motion.div>
		</div>
	)
}
