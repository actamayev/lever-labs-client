import { AnimatePresence, motion } from "framer-motion"
import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle,
	Trophy, Heading1, Heading2, Heading3, Heading4, Heading5 } from "lucide-react"
import ChallengeSection from "./challenge-section"
import getDuolingoColors from "../../../utils/get-duolingo-colors"

// eslint-disable-next-line @typescript-eslint/naming-convention
const ICON_MAP = {
	Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy, Heading1, Heading2, Heading3, Heading4, Heading5
}

interface RightContentProps {
	rightContent: RightContent
	color: DuolingoColors
	isDataReady: boolean
}

export default function RightContent({ rightContent, color, isDataReady }: RightContentProps) {
	const colors = getDuolingoColors(color)

	if (!isDataReady) {
		return (
			<div className="h-full w-full flex items-center justify-center" />
		)
	}
	if (rightContent.type === "image") {
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
