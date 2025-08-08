"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import SingleComponentUsed from "../single-component-used"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import { introductionData } from "../../../utils/constants/career-quest/career-data"
import { CAREER_QUEST_CARD_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import Link from "next/link"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import careerQuestClass from "../../../classes/career-quest-class"
import { observer } from "mobx-react"

function FrontIntroductionCard({ flipCard } : {flipCard: () => void}) {
	const { careerName, careerIcon: Icon, componentsUsed, backgroundColor, careerUUID } = introductionData

	const colors = getDuolingoColors(backgroundColor)

	return (
		<motion.div
			className={cn("absolute w-full h-full backface-hidden flex cursor-default", colors.bg2)}
			style={{
				backfaceVisibility: "hidden",
				borderRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS
			}}
		>
			<div
				className={cn("flex items-center justify-center", colors.bg)}
				style={{
					borderRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS,
					width: "calc(50% - 16px)"
				}}
			>
				<Icon
					size="200"
					className="w-12 h-12 md:w-24 md:h-24 lg:w-48 lg:h-48 xl:w-64 xl:h-64"
				/>
			</div>

			{/* Right Section */}
			<div
				className={cn("flex flex-col pl-7", colors.bg2)}
				style={{
					width: "calc(50% + 16px)",
					borderRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS
				}}
			>
				{/* Title */}
				<h3
					className="text-2xl font-bold mb-5 mt-7 mr-7"
					style={{
						fontSize: "27px",
						lineHeight: "34px",
						cursor: "text"
					}}
				>
					{careerName}
				</h3>

				{/* Component Icons */}
				<div className="flex flex-wrap gap-2 mb-auto">
					{componentsUsed.slice(0, 4).map((component) => (
						<SingleComponentUsed
							key={component.componentName}
							component={component}
							baseColor={backgroundColor}  // Pass base color
						/>
					))}
					{componentsUsed.length > 4 && (
						<div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", colors.bg2)}>
							<span className="font-bold">+{componentsUsed.length - 4}</span>
						</div>
					)}
				</div>

				{/* Continue Button */}
				<div className="flex flex-row items-center mb-6 w-full gap-3">
					<Link href={introductionData.careerUrl} className="flex-1">
						<TactileButton
							className={cn("duration-150 bg-white h-10 rounded-full text-base w-full", colors.text2)}
							shadowClass={colors.shadow}
							shadowHeight={4}
						>
							{careerQuestClass.getCompletedChallengesForProgress(careerUUID) === 0 ? "START" : "CONTINUE"}
						</TactileButton>
					</Link>
					<BackFlipButton
						onFlip={flipCard}
						extraClasses="size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
						style={{ marginRight: "30px" }}
					/>
				</div>
			</div>
		</motion.div>
	)
}

export default observer(FrontIntroductionCard)
