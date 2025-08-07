"use client"

import { motion } from "framer-motion"
import { Hourglass } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import { CAREER_QUEST_CARD_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import SingleComponentUsed from "../single-component-used"
import SingleCodingConceptUsed from "../single-coding-concept-used"
import { Separator } from "../../shadcn/ui/separator"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

export default function BackCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { careerName, careerDescription, backgroundColor, expectedCompletionTime, componentsUsed, codingConcepts } = careerData

	const colors = getDuolingoColors(backgroundColor)

	return (
		<motion.div
			className={cn("absolute w-full h-full backface-hidden flex flex-col cursor-default", colors.bg)}
			style={{
				backfaceVisibility: "hidden",
				borderRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS,
				transform: "rotateY(180deg)",
			}}
		>
			<div className="w-full h-full flex flex-col px-7">
				{/* Title */}
				<div className="flex items-start flex-col" style={{ height: "55%", marginTop: "36px" }}>
					<h3
						className="font-bold text-white text-3xl"
						style={{ cursor: "text", height: "25%" }}
					>
						{careerName}
					</h3>

					<div className="text-base text-white leading-relaxed mt-10 font-medium" style={{ height: "75%" }}>
						{careerDescription}
					</div>
				</div>

				<div style={{ height: "45%" }}>
					<div className="flex items-center justify-between" style={{ height: "70%" }}>
						{/* Components grid (2x2 like front card) */}
						<div className="grid grid-cols-2 gap-1.5" style={{ height: "84px" }}>
							{componentsUsed.slice(0, 4).map((component) => (
								<SingleComponentUsed
									key={component.componentName}
									component={component}
									baseColor={backgroundColor}
								/>
							))}
							{componentsUsed.length > 4 && (
								<div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center text-white", colors.bg2)}>
                                +{componentsUsed.length - 4}
								</div>
							)}
						</div>

						{/* Divider */}
						<Separator
							orientation="vertical"
							className="bg-swan rounded-2xl"
							style={{ width: "2px", height: "84px" }}
						/>

						{/* Coding concepts */}
						<div className="grid grid-cols-2 gap-1.5" style={{ height: "84px" }}>
							{codingConcepts.slice(0, 4).map((concept) => (
								<SingleCodingConceptUsed key={concept} codingConcept={concept} baseColor={backgroundColor} />
							))}
							{codingConcepts.length > 4 && (
								<div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center text-white", colors.bg2)}>
                                +{codingConcepts.length - 4}
								</div>
							)}
						</div>
					</div>

					{/* Bottom: Time to Complete + Flip Button */}
					<div style={{ height: "30%" }}>
						<div className="pb-4 flex flex-row items-center gap-3">
							<div className="flex-1">
								<div
									className={cn(
										"bg-white h-10 rounded-full text-base w-full flex items-center justify-center",
										colors.text2
									)}
								>
									<Hourglass className="w-5 h-5 mr-2" />
									<span className="font-medium">{expectedCompletionTime}</span>
								</div>
							</div>
							<BackFlipButton
								onFlip={flipCard}
								extraClasses="size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
								style={{ marginRight: "30px" }}
							/>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
