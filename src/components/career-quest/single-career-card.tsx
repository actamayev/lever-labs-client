/* eslint-disable max-len */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/shadcn/utils"
import SingleComponentUsed from "./single-component-used"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

// eslint-disable-next-line max-lines-per-function
export default function SingleCareerCard({ careerData }: { careerData: CareerData }) {
	const { careerName, componentsUsed, careerUrl, careerIcon: Icon, totalLessons, lessonsComplete, backgroundColor } = careerData
	const navigate = useTypedNavigate()
	const [flipped, setFlipped] = useState(false)

	// Calculate progress percentage
	const progressPercentage = Math.max(7, Math.min(100, ((lessonsComplete) / totalLessons) * 100))

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
				{/* Front of card */}
				<motion.div
					className={cn(
						"absolute w-full h-full backface-hidden flex cursor-default",
						backgroundColor
					)}
					style={{
						backfaceVisibility: "hidden",
					}}
				>
					{/* Left Section */}
					<div className="w-1/2 flex flex-col p-6 justify-between">
						{/* Title */}
						<h3 className="text-2xl font-bold">{careerName}</h3>

						{/* Progress Bar */}
						<div className="w-full h-5 bg-emerald-600 rounded-full overflow-hidden relative">
							<div
								className="relative h-full rounded-full duration-0 ease-out bg-emerald-300"
								style={{
									width: `${progressPercentage}%`,
								}}
							>
								{/* Highlight shadow effect - only on the completed part */}
								<div
									className="absolute top-1 left-2 right-2 rounded-full"
									style={{
										background: "rgb(167, 243, 208)",
										height: "3px"
									}}
								/>
							</div>

							{/* Text inside progress bar */}
							<div className="absolute inset-0 flex items-center justify-center text-sm font-medium cursor-default">
								{lessonsComplete} / {totalLessons}
							</div>
						</div>

						{/* Component Icons */}
						<div className="flex flex-wrap gap-2 my-4">
							{componentsUsed.slice(0, 4).map((component) => (
								<SingleComponentUsed
									key={component.componentName}
									component={component}
								/>
							))}
							{componentsUsed.length > 4 && (
								<div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center">
									<span className="font-bold">+{componentsUsed.length - 4}</span>
								</div>
							)}
						</div>

						{/* Continue Button */}
						<TactileButton
							className="duration-0 text-emerald-600 bg-white hover:bg-[rgb(230,230,230)] h-12 rounded-2xl text-base"
							onClick={() => navigate(careerUrl)}
							shadowColor="rgb(178,214,201)"
						>
							{lessonsComplete === 0 ? "START" : "CONTINUE"}
						</TactileButton>
					</div>

					{/* Right Section with Image */}
					<div className="w-1/2 flex items-center justify-center">
						<Icon
							size="200"
							className="w-12 h-12 md:w-24 md:h-24 lg:w-48 lg:h-48 xl:w-64 xl:h-64"
							fill="white"
						/>
					</div>

					{/* Flip button */}
					<button
						onClick={() => setFlipped(true)}
						className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white bg-opacity-20 flex
						items-center justify-center hover:bg-opacity-30 focus:outline-none duration-0"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
					</button>
				</motion.div>

				{/* Back of card */}
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
			</motion.div>
		</div>
	)
}
