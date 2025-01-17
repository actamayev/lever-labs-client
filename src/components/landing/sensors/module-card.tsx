import { motion } from "framer-motion"
import { InfinityIcon } from "lucide-react"
import { useCallback, useState } from "react"
import SensorsSkeleton from "./sensors-skeleton"
import { bentoIconSize } from "../../../utils/constants"
import { CustomInfinity } from "../../icons/custom-infinity"

// eslint-disable-next-line @typescript-eslint/naming-convention
const COLORS = [
	"rgb(255, 0, 0)",    // Red
	"rgb(0, 255, 0)",    // Green
	"rgb(0, 0, 255)",    // Blue
	"currentColor"       // White/Default color
]

export default function ModuleCard() {
	const [isHovered, setIsHovered] = useState(false)
	const [colorIndex, setColorIndex] = useState(-1) // -1 for initial state

	const handleClick = useCallback(() => {
		setColorIndex((prevIndex) => (prevIndex + 1) % COLORS.length)
	}, [])

	const currentColor = colorIndex === -1 ? "currentColor" : COLORS[colorIndex]

	return (
		<SensorsSkeleton
			title="Modules: Expandable Capabilities"
			description="Snap on optional modules like a camera to extend Pip's functionality!"
			icon={
				<div
					className="pointer-events-auto w-fit relative cursor-pointer"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={handleClick}
				>
					{/* Static infinity icon */}
					<CustomInfinity
						className="transition-all duration-300"
						style={{ color: currentColor }}
						size={bentoIconSize}
					/>

					{/* Animated dot following infinity path */}
					{isHovered && (
						<motion.div
							className="absolute inset-0 transition-all duration-300"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
						>
							<motion.div
								className="absolute h-2 w-2 rounded-full"
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
								className="transition-all duration-300"
								style={{ color: currentColor }}
								size={bentoIconSize}
							/>
						</motion.div>
					)}
				</div>
			}
			outerDivStyles="row-start-3 row-span-1 col-start-2 col-span-2"
			paragraphStyles="whitespace-nowrap"
		/>
	)
}
