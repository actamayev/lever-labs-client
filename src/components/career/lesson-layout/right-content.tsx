import { observer } from "mobx-react"
import { AnimatePresence, motion } from "framer-motion"
import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle,
	Trophy, Heading1, Heading2, Heading3, Heading4, Heading5 } from "lucide-react"
import ChallengeSection from "./challenge-section"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import careerQuestClass from "../../../classes/career-quest-class"
import CareerChatInterface from "../chat/career-chat-interface"

// eslint-disable-next-line @typescript-eslint/naming-convention
const ICON_MAP = {
	Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy, Heading1, Heading2, Heading3, Heading4, Heading5
}

function RightContent({ careerData } : { careerData: CareerQuestData }) {
	const colors = getDuolingoColors(careerData.careerColor)
	const rightContent = careerQuestClass.getRightContent(careerData.careerUUID)
	const isDataReady = careerQuestClass.hasRetrievedAllChallengesForCareer(careerData.careerUUID)

	if (!isDataReady) {
		return <div className="h-full w-full flex items-center justify-center" />
	}

	if (rightContent.type === "chat") {
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${careerData.careerUUID}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<CareerChatInterface careerUUID={careerData.careerUUID} />
				</motion.div>
			</AnimatePresence>
		)
	} else if (rightContent.type === "image") {
		const IconComponent = ICON_MAP[rightContent.icon as keyof typeof ICON_MAP]
		return (
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${rightContent.icon}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<IconComponent size={120} className={colors.text} />
				</motion.div>
			</AnimatePresence>
		)
	}

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={`${rightContent.type}-${rightContent.challengeData.challengeUUID}`}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				className="h-full w-full"
			>
				<ChallengeSection challengeData={rightContent.challengeData} />
			</motion.div>
		</AnimatePresence>
	)
}

export default observer(RightContent)
