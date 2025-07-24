"use client"

import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import FrontIntroductionCard from "./front-introduction-card"
import BackIntroductionCard from "./back-introduction-card"

interface IntroCardProps {
	introData: CareerData
}

export default function IntroductionCard({ introData }: IntroCardProps) {
	const [flipped, setFlipped] = useState(false)

	const flipCard = useCallback(() => {
		setFlipped(prev => !prev)
	}, [])

	return (
		<div className={cn("relative overflow-hidden text-white w-full aspect-[750/321]")}>
			<motion.div
				className="w-full h-full relative preserve-3d"
				animate={{ rotateY: flipped ? 180 : 0 }}
				transition={{ duration: 0.7 }}
				style={{ transformStyle: "preserve-3d" }}
			>
				<FrontIntroductionCard
					introData={introData}
					flipCard={flipCard}
				/>

				<BackIntroductionCard
					introData={introData}
					flipCard={flipCard}
				/>
			</motion.div>
		</div>
	)
}
