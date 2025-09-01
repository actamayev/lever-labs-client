"use client"

import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import FrontMeetPipCard from "./front-meet-pip-card"
import BackMeetPipCard from "./back-meet-pip-card"

export default function MeetPipCard(): React.ReactNode {
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
				<FrontMeetPipCard flipCard={flipCard} />

				<BackMeetPipCard flipCard={flipCard} />
			</motion.div>
		</div>
	)
}
