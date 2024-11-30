import { motion } from "framer-motion"
import { FaInfinity } from "react-icons/fa"
import { useCallback, useState } from "react"
import { cn } from "@/lib/shadcn/utils"

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
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				"row-start-3 row-span-1 col-start-2 col-span-2"
			)}
		>
			<div>
				<img className="absolute -right-20 -top-20 opacity-60" />
			</div>
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6">
				<div
					className="pointer-events-auto w-fit relative cursor-pointer"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={handleClick}
				>
					{/* Static infinity icon */}
					<FaInfinity
						className="h-12 w-12 transition-all duration-300"
						style={{ color: currentColor }}
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
									x: [7, 20, 35, 20, 7],
									y: [20, 0, 20, 40, 20],
									scale: [1, 1.2, 1, 1.2, 1]
								}}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									ease: "linear"
								}}
							/>
							<FaInfinity
								className="h-12 w-12 transition-all duration-300"
								style={{ color: currentColor }}
							/>
						</motion.div>
					)}
				</div>
				<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          Module
				</h3>
				<p className="max-w-lg text-neutral-400">
          We automatically save your files as you type.
				</p>
			</div>
		</div>
	)
}
