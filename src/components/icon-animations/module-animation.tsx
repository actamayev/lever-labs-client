"use client"

import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import { CustomInfinity } from "../icons/custom-infinity"
import { InfinityIcon } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/naming-convention
const COLORS = [
	"rgb(255, 0, 0)",    // Red
	"rgb(0, 255, 0)",    // Green
	"rgb(0, 0, 255)",    // Blue
	"currentColor"       // White/Default color
]

export default function ModuleAnimation({ iconSize } : { iconSize: number }) {
	const [isHovered, setIsHovered] = useState(false)
	const [colorIndex, setColorIndex] = useState(-1) // -1 for initial state

	const handleClick = useCallback(() => {
		setColorIndex((prevIndex) => (prevIndex + 1) % COLORS.length)
	}, [])

	const currentColor = colorIndex === -1 ? "currentColor" : COLORS[colorIndex]

	return (
		<div
			className="pointer-events-auto w-fit relative cursor-pointer"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleClick}
		>
			{/* Static infinity icon */}
			<CustomInfinity
				className="transition-all duration-300 text-questionText"
				style={{ color: currentColor }}
				size={iconSize}
			/>

			{/* Animated dot following infinity path */}
			{isHovered && (
				<motion.div
					className="absolute inset-0 transition-all duration-300"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<motion.div
						className="absolute h-2 w-2 rounded-full text-questionText"
						style={{ backgroundColor: currentColor }}
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
						className="transition-all duration-300 text-questionText"
						style={{ color: currentColor }}
						size={iconSize}
					/>
				</motion.div>
			)}
		</div>
	)
}
