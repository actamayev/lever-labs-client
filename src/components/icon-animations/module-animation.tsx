"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { CustomInfinity } from "../../icons/custom-infinity"
import { InfinityIcon } from "lucide-react"

export default function ModuleAnimation({ iconSize } : { iconSize: number }): React.ReactNode {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div
			className="pointer-events-auto w-fit relative"
			onMouseEnter={(): void => setIsHovered(true)}
			onMouseLeave={(): void => setIsHovered(false)}
		>
			{/* Static infinity icon */}
			<CustomInfinity
				className="duration-0 text-question-text"
				size={iconSize}
			/>

			{/* Animated dot following infinity path */}
			{isHovered && (
				<motion.div
					className="absolute inset-0 duration-0"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<motion.div
						className="absolute h-2 w-2 rounded-full bg-question-text"
						animate={{
							x: [1, 16, 31, 16, 1],
							y: [16, 1, 16, 31, 16],
							scale: [1.2, 1.2, 1.2, 1.2, 1.2]
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "linear"
						}}
					/>
					<InfinityIcon
						className="duration-0 text-question-text"
						size={iconSize}
					/>
				</motion.div>
			)}
		</div>
	)
}
