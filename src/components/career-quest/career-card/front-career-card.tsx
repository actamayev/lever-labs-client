"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import SingleComponentUsed from "../single-component-used"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import SingleCodingConceptUsed from "../single-coding-concept-used"
import { getDuolingoColors, getProgressColors } from "../../../utils/duolingo-utils"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

// eslint-disable-next-line max-lines-per-function
export default function FrontCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { careerName, componentsUsed, careerUrl, careerIcon: Icon,
		totalLessons, lessonsComplete, backgroundColor, codingConcepts } = careerData

	const colors = getDuolingoColors(backgroundColor)
	const progressColors = getProgressColors(backgroundColor)

	// Calculate progress percentage
	const progressPercentage = Math.max(7, Math.min(100, ((lessonsComplete) / totalLessons) * 100))

	return (
		<motion.div
			className={cn(
				"absolute w-full h-full backface-hidden flex flex-col cursor-default",
				colors.bg
			)}
			style={{ backfaceVisibility: "hidden" }}
		>
			{/* Header with title */}
			<div className="p-4 pb-2">
				<h3 className="text-xl font-bold text-white mb-3">{careerName}</h3>

				{/* Progress Bar */}
				<div className={cn("w-full h-4 rounded-full overflow-hidden relative", progressColors.background)}>
					<div
						className={cn("relative h-full rounded-full duration-0 ease-out", progressColors.fill)}
						style={{
							width: `${progressPercentage}%`,
						}}
					>
						{/* Highlight shadow effect */}
						<div
							className={cn("absolute top-0.5 left-1 right-1 rounded-full", progressColors.highlight)}
							style={{
								height: "3px"
							}}
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
						{lessonsComplete}/{totalLessons}
					</div>
				</div>
			</div>

			{/* Icon/Image Section */}
			<div className="flex-1 flex items-center justify-center px-4 py-2">
				<Icon
					size="120"
					className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
					fill="white"
				/>
			</div>

			{/* Components Section */}
			<div className="px-4 pb-2">
				<h4 className="text-sm font-medium text-white mb-2">Sensors:</h4>
				<div className="flex flex-wrap gap-1.5 justify-center">
					{componentsUsed.slice(0, 4).map((component) => (
						<SingleComponentUsed
							key={component.componentName}
							component={component}
							baseColor={backgroundColor}
						/>
					))}
					{componentsUsed.length > 4 && (
						<div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", colors.bg2)}>
							<span className="font-bold text-xs">+{componentsUsed.length - 4}</span>
						</div>
					)}
				</div>
			</div>

			{/* Coding Concepts Section */}
			<div className="px-4 pb-4">
				<h4 className="text-sm font-medium text-white mb-2">Concepts:</h4>
				<div className="flex flex-wrap gap-1.5 justify-center">
					{codingConcepts.slice(0, 3).map((codingConcept) => (
						<SingleCodingConceptUsed
							key={codingConcept}
							codingConcept={codingConcept}
							baseColor={backgroundColor}  // Pass base color
						/>
					))}
					{codingConcepts.length > 3 && (
						<div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", colors.bg1)}>
							<span className="font-bold text-xs">+{codingConcepts.length - 3}</span>
						</div>
					)}
				</div>
			</div>

			{/* Continue Button */}
			<div className="p-4 pt-2">
				<Link href={careerUrl}>
					<TactileButton
						className={cn("duration-150 bg-white h-10 rounded-2xl text-base w-full", colors.text)}
						shadowClass={colors.shadow}
						shadowHeight={4}
					>
						{lessonsComplete === 0 ? "START" : "CONTINUE"}
					</TactileButton>
				</Link>
			</div>

			{/* Flip Button */}
			<button
				onClick={flipCard}
				className="absolute top-4 right-4 size-6 rounded-full flex items-center justify-center focus:outline-none duration-0 z-10"
			>
				<Info size={20} strokeWidth={2.5} className="text-white"/>
			</button>
		</motion.div>
	)
}
