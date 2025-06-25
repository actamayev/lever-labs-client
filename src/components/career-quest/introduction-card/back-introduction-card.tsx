"use client"

import { motion } from "framer-motion"
import { Hourglass } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import { Separator } from "../../shadcn/ui/separator"
import SingleComponentUsed from "../single-component-used"
import SingleCodingConceptUsed from "../single-coding-concept-used"
import { getDuolingoColors } from "../../../utils/duolingo-utils"

interface Props {
	introData: IntroductionData
	flipCard: () => void
}

export default function BackIntroductionCard(props: Props) {
	const { introData, flipCard } = props
	const {
		title,
		description,
		backgroundColor,  // This is now a DuolingoColors type
		componentsUsed,
		codingConcepts,
		timeToComplete
	} = introData

	// Generate color classes
	const colors = getDuolingoColors(backgroundColor)

	return (
		<motion.div
			className={cn(
				"absolute w-full h-full backface-hidden flex",
				colors.bg  // bg-humpback, bg-beetle, etc.
			)}
			style={{
				backfaceVisibility: "hidden",
				transform: "rotateY(180deg)",
			}}
		>
			<div className="w-full flex flex-col p-6">
				<h3 className="text-2xl font-bold text-white">{title}</h3>
				<div className="text-base my-4 text-white">
					{description}
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex flex-col items-center w-1/3 px-2">
						<h3 className="text-base font-medium text-center mb-3 text-white">
							Sensors you'll be using:
						</h3>
						<div className="grid grid-cols-3 gap-2 w-full">
							{componentsUsed.slice(0, 5).map((component) => (
								<SingleComponentUsed
									key={component.componentName}
									component={component}
									baseColor={backgroundColor}  // Pass base color instead of hardcoded bgColor
								/>
							))}
							{componentsUsed.length > 5 && (
								<div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", colors.bg2)}>
									<span className="font-bold text-white">+{componentsUsed.length - 5}</span>
								</div>
							)}
						</div>
					</div>

					<Separator orientation="vertical" className="bg-white rounded-2xl h-auto w-[2px]"/>

					<div className="flex flex-col items-center w-1/3 px-2">
						<h3 className="text-base font-medium text-center mb-3 text-white">
							Coding Concepts
						</h3>
						<div className="grid grid-cols-3 gap-2 w-full justify-items-center">
							{codingConcepts.slice(0, 5).map((codingConcept) => (
								<SingleCodingConceptUsed
									key={codingConcept}
									codingConcept={codingConcept}
									baseColor={backgroundColor}  // Add missing baseColor prop
								/>
							))}
							{codingConcepts.length > 5 && (
								<div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", colors.bg1)}>
									<span className="font-bold text-white">+{codingConcepts.length - 5}</span>
								</div>
							)}
						</div>
					</div>

					<Separator orientation="vertical" className="bg-white rounded-2xl h-auto w-[2px]"/>

					<div className="flex flex-col items-center w-1/3 px-2">
						<h3 className="text-base font-medium text-center mb-3 text-white">
							Estimated time to complete:
						</h3>
						<div className="flex flex-row items-center gap-2 mt-2">
							<Hourglass className="w-6 h-6 text-white"/>
							<div className="font-medium text-base text-white">{timeToComplete} minutes</div>
						</div>
					</div>
				</div>
			</div>

			<BackFlipButton
				onFlip={flipCard}
				extraClasses="absolute bottom-6 right-6 size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
			/>
		</motion.div>
	)
}
