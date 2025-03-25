"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "./back-flip-button"
import SingleComponentUsed from "../single-component-used"
import { Separator } from "../../shadcn/ui/separator"
import { Hourglass } from "lucide-react"
import SingleCodingConceptUsed from "../single-coding-concept-used"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

export default function BackCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { careerName, backgroundColor, componentsUsed, codingConcepts } = careerData

	return (
		<motion.div
			className={cn(
				"absolute w-full h-full backface-hidden flex",
				backgroundColor
			)}
			style={{
				backfaceVisibility: "hidden",
				transform: "rotateY(180deg)",
			}}
		>
			<div className="w-full flex flex-col p-6">
				<h3 className="text-2xl font-bold mb-5">{careerName}</h3>
				<div className="text-base">
					In this role, you'll guide Pip along a drawn line using IR sensors to detect black or white surfaces.
					By controlling the motors independently, you'll ensure Pip stays on track.
				</div>
				<div className="flex flex-row px-4 mt-4 text-base">
					<div className="flex flex-col items-center w-1/3">
						<div className="flex items-center mb-2">
							Sensors you'll be using:
						</div>
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
					</div>

					<Separator orientation="vertical" className="bg-white rounded-2xl"/>
					<div className="flex flex-col items-center w-1/3">
						<div className="flex items-center mb-2">
							Coding Concepts
						</div>
						<div className="flex flex-wrap gap-2 mb-auto">
							{codingConcepts.slice(0, 4).map((codingConcept) => (
								<SingleCodingConceptUsed
									key={codingConcept}
									codingConcept={codingConcept}
								/>
							))}
							{codingConcepts.length > 4 && (
								<div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center">
									<span className="font-bold">+{codingConcepts.length - 4}</span>
								</div>
							)}
						</div>
					</div>

					<Separator orientation="vertical" className="bg-white rounded-2xl"/>
					<div className="flex flex-col items-center w-1/3">
						<div className="flex items-center mb-2">
							Estimated time to complete:
						</div>
						<div className="flex flex-row gap-2">
							<Hourglass />
							<div>10 hours</div>
						</div>
					</div>
				</div>
			</div>

			<BackFlipButton onFlip={flipCard} />
		</motion.div>
	)
}
