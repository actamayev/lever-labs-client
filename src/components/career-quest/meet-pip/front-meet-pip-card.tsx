"use client"

import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import SingleComponentUsed from "../single-component-used"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import { meetPipData } from "../../../utils/constants/career-quest/career-data"
import { CAREER_QUEST_CARD_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import careerQuestClass from "../../../classes/career-quest-class"
import { observer } from "mobx-react"
import { useCallback } from "react"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { CareerType, MeetPipTriggerType } from "@bluedotrobots/common-ts/protocol"
import careerQuestTrigger from "../../../utils/career-quest/career-quest-trigger"

function FrontMeetPipCard({ flipCard } : {flipCard: () => void}): React.ReactNode {
	const { careerName, careerIcon: Icon, componentsUsed, backgroundColor, careerUUID } = meetPipData
	const navigate = useTypedNavigate()

	const colors = getDuolingoColors(backgroundColor)

	const enterCareerOnClick = useCallback((): void => {
		navigate(meetPipData.careerUrl)
		careerQuestTrigger(CareerType.MEET_PIP, MeetPipTriggerType.ENTER_CAREER)
	}, [navigate])

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
					<div className="grid grid-cols-5 gap-2 w-3/4">
						{componentsUsed.map((componentName): React.ReactNode => (
							<SingleComponentUsed
								key={componentName}
								componentName={componentName}
								baseColor={backgroundColor}  // Pass base color
							/>
						))}
					</div>
				</div>

				{/* Continue Button */}
				<div className="flex flex-row items-center mb-6 w-full gap-3">
					<TactileButton
						className={cn("duration-150 bg-white h-10 rounded-full text-base w-full", colors.text2)}
						shadowClass={colors.shadow}
						shadowHeight={4}
						onClick={enterCareerOnClick}
					>
						{careerQuestClass.getCompletedChallengesForProgress(careerUUID) === 0 ? "START" : "CONTINUE"}
					</TactileButton>
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

export default observer(FrontMeetPipCard)
