"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import SingleComponentUsed from "../single-component-used"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import StartButton from "../start-button"
import { CAREER_QUEST_CARD_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import ChallengeProgressCircle from "./challenge-progress-indicator"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

// eslint-disable-next-line max-lines-per-function
export default function FrontCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { careerName, componentsUsed, careerUrl, careerIcon: Icon,
		lessonsComplete, backgroundColor } = careerData

	const colors = getDuolingoColors(backgroundColor)

	return (
		<motion.div
			className={cn("absolute w-full h-full backface-hidden flex flex-col cursor-default", colors.bg2)}
			style={{
				backfaceVisibility: "hidden",
				borderRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS
			}}
		>
			{/* Icon/Image Section */}
			<div
				className={cn("flex-1 flex items-center justify-center px-4 py-2", colors.bg)}
				style={{ borderRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS, height: "55%" }}
			>
				<Icon
					size="120"
					className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
				/>
			</div>
			<div
				className={colors.bg2}
				style={{
					borderBottomLeftRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS,
					borderBottomRightRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS,
					height: "45%"
				}}
			>
				<div style={{ height: "25%" }} className="flex items-center">
					<h3
						className="font-bold text-white ml-7"
						style={{
							fontSize: "27px",
							lineHeight: "34px",
							cursor: "text"
						}}
					>
						{careerName}
					</h3>
				</div>
				<div style={{ height: "45%" }} className="flex justify-between px-7 items-center">
					{/* Components Grid */}
					<div className="grid grid-cols-2 gap-1.5" style={{ height: "84px" }}>
						{componentsUsed.slice(0, 4).map((component) => (
							<SingleComponentUsed
								key={component.componentName}
								component={component}
								baseColor={backgroundColor}
							/>
						))}
					</div>

					{/* Progress Circle */}
					<div className="flex-1 flex justify-end">
						<ChallengeProgressCircle careerData={careerData} />
					</div>
				</div>
				<div style={{ height: "30%" }}>
					<div className="pl-7 pb-4 flex flex-row items-center gap-3">
						<StartButton
							baseColor={backgroundColor}
							lessonsComplete={lessonsComplete}
							careerUrl={careerUrl}
						/>
						{/* Flip Button */}
						<BackFlipButton
							onFlip={flipCard}
							extraClasses="size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
							style={{
								marginRight: "30px"
							}}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
