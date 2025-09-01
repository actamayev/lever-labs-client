"use client"

import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import FrontIntroductionCard from "./front-introduction-card"
import BackIntroductionCard from "./back-introduction-card"

export default function IntroductionCard(): React.ReactNode {
	const [flipped, setFlipped] = useState(false)

	const flipCard = useCallback((): void => {
		setFlipped((prev): boolean => !prev)
	}, [])

	return (
		<div className={cn("relative overflow-hidden text-white w-full aspect-[750/321]")}>
			<motion.div
				className="w-full h-full relative preserve-3d"
				animate={{ rotateY: flipped ? 180 : 0 }}
				transition={{ duration: 0.7 }}
				style={{ transformStyle: "preserve-3d" }}
			>
				<FrontIntroductionCard flipCard={flipCard} />

				<BackIntroductionCard flipCard={flipCard} />
			</motion.div>
		</div>
	)
}
