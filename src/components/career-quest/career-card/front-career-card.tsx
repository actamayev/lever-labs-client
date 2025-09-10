
"use client"
import { motion } from "framer-motion"
import { observer } from "mobx-react"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import SingleComponentUsed from "../single-component-used"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import careerQuestClass from "../../../classes/career-quest-class"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import ChallengeProgressCircle from "./challenge-progress-indicator"
import { CAREER_QUEST_CARD_ROUNDING_RADIUS } from "../../../utils/constants/constants"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"

interface Props {
	careerData: CareerData
	flipCard: () => void
}


function FrontCareerCard(props: Props): React.ReactNode {
	const { careerData, flipCard } = props
	const { careerName, componentsUsed, careerIcon: Icon, backgroundColor, careerUUID } = careerData
	const navigate = useTypedNavigate()
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
				className={cn("px-7", colors.bg2)}
				style={{
					borderBottomLeftRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS,
					borderBottomRightRadius: CAREER_QUEST_CARD_ROUNDING_RADIUS,
					height: "45%"
				}}
			>
				<div style={{ height: "25%" }} className="flex items-end">
					<h3
						className="font-bold text-white"
						style={{
							fontSize: "27px",
							lineHeight: "34px",
							cursor: "text"
						}}
					>
						{careerName}
					</h3>
				</div>
				<div style={{ height: "45%" }} className="flex justify-between items-center">
					{/* Components Grid */}
					<div className="grid grid-cols-2 gap-1.5" style={{ height: "84px" }}>
						{componentsUsed.slice(0, 4).map((componentName): React.ReactNode => (
							<SingleComponentUsed
								key={componentName}
								componentName={componentName}
								baseColor={backgroundColor}
							/>
						))}
					</div>

					{/* Progress Circle */}
					<div className="flex-1 flex justify-end">
						<ChallengeProgressCircle careerUUID={careerUUID} />
					</div>
				</div>
				<div style={{ height: "30%" }}>
					<div className="pb-4 flex flex-row items-center gap-3">
						<TactileButton
							className={cn("duration-150 bg-white h-10 rounded-full text-base w-full", colors.text2)}
							shadowClass={colors.shadow}
							shadowHeight={4}
							disabled={careerData.isDisabled}
							onClick={(): void => {
								navigate(careerData.careerUrl)
							}}
						>
							{careerQuestClass.getCompletedChallengesForProgress(careerUUID) === 0 ? "START" : "CONTINUE"}
						</TactileButton>

						<BackFlipButton
							onFlip={flipCard}
							extraClasses="size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
						/>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

export default observer(FrontCareerCard)
