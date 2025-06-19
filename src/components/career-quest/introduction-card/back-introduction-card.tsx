"use client"

import { motion } from "framer-motion"
import { Hourglass } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import { Separator } from "../../shadcn/ui/separator"
import SingleComponentUsed from "../single-component-used"
import SingleCodingConceptUsed from "../single-coding-concept-used"

interface Props {
	introData: IntroductionData
	flipCard: () => void
}

export default function BackIntroductionCard(props: Props) {
	const { introData, flipCard } = props
	const { title, description, backgroundColor, componentsUsed, codingConcepts } = introData

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
				<h3 className="text-2xl font-bold">{title}</h3>
				<div className="text-base my-4">
					{description}
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex flex-col items-center w-1/3 px-2">
						<h3 className="text-base font-medium text-center mb-3">
							Sensors you'll be using:
						</h3>
						<div className="grid grid-cols-3 gap-2 w-full">
							{componentsUsed.slice(0, 5).map((component) => (
								<SingleComponentUsed
									key={component.componentName}
									component={component}
								/>
							))}
							{componentsUsed.length > 5 && (
								<div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center">
									<span className="font-bold">+{componentsUsed.length - 5}</span>
								</div>
							)}
						</div>
					</div>

					<Separator orientation="vertical" className="bg-white rounded-2xl h-auto w-[2px]"/>

					<div className="flex flex-col items-center w-1/3 px-2">
						<h3 className="text-base font-medium text-center mb-3">
							Coding Concepts
						</h3>
						<div className="grid grid-cols-3 gap-2 w-full justify-items-center">
							{codingConcepts.slice(0, 5).map((codingConcept) => (
								<SingleCodingConceptUsed
									key={codingConcept}
									codingConcept={codingConcept}
								/>
							))}
							{codingConcepts.length > 5 && (
								<div className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center">
									<span className="font-bold">+{codingConcepts.length - 5}</span>
								</div>
							)}
						</div>
					</div>

					<Separator orientation="vertical" className="bg-white rounded-2xl h-auto w-[2px]"/>

					<div className="flex flex-col items-center w-1/3 px-2">
						<h3 className="text-base font-medium text-center mb-3">
							Estimated time to complete:
						</h3>
						<div className="flex flex-row items-center gap-2 mt-2">
							<Hourglass className="w-6 h-6"/>
							<div className="font-medium text-base">10 hours</div>
						</div>
					</div>
				</div>
			</div>

			<BackFlipButton onFlip={flipCard} />
		</motion.div>
	)
}
