"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "./back-flip-button"
import SingleComponentUsed from "../single-component-used"
import { TactileButton } from "../../shadcn/ui/tactile-button"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

// eslint-disable-next-line max-lines-per-function
export default function FrontCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { careerName, componentsUsed, careerUrl, careerIcon: Icon, totalLessons, lessonsComplete, backgroundColor } = careerData

	// Calculate progress percentage
	const progressPercentage = Math.max(7, Math.min(100, ((lessonsComplete) / totalLessons) * 100))

	return (
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
			<div className="w-1/2 flex flex-col p-6">
				{/* Title */}
				<h3 className="text-2xl font-bold mb-5">{careerName}</h3>

				{/* Progress Bar */}
				<div className="w-full h-5 bg-emerald-600 rounded-full overflow-hidden relative mb-5">
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
				<div className="flex flex-wrap gap-2 mb-auto">
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
				<Link href={careerUrl}>
					<TactileButton
						className="duration-150 text-emerald-600 bg-white h-12 rounded-2xl text-base w-full"
						shadowColor="rgb(178,214,201)"
					>
						{lessonsComplete === 0 ? "START" : "CONTINUE"}
					</TactileButton>
				</Link>

			</div>

			{/* Right Section with Image */}
			<div className="w-1/2 flex items-center justify-center">
				<Icon
					size="200"
					className="w-12 h-12 md:w-24 md:h-24 lg:w-48 lg:h-48 xl:w-64 xl:h-64"
					fill="white"
				/>
			</div>

			<BackFlipButton onFlip={flipCard} />
		</motion.div>
	)
}
