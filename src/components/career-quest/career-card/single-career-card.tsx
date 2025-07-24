"use client"

import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import BackCareerCard from "./back-career-card"
import FrontCareerCard from "./front-career-card"

export default function SingleCareerCard({ careerData }: { careerData: CareerData }) {
	const [flipped, setFlipped] = useState(false)

	const flipCard = useCallback(() => {
		setFlipped(prev => !prev)
	}, [])

	return (
		<div className={"relative overflow-hidden text-white w-full aspect-[5/7]"}>
			{/* Card container */}
			<motion.div
				className="w-full h-full relative preserve-3d"
				animate={{ rotateY: flipped ? 180 : 0 }}
				transition={{ duration: 0.7 }}
				style={{ transformStyle: "preserve-3d" }}
			>
				<FrontCareerCard
					careerData={careerData}
					flipCard={flipCard}
				/>

				<BackCareerCard
					careerData={careerData}
					flipCard={flipCard}
				/>
			</motion.div>
		</div>
	)
}
