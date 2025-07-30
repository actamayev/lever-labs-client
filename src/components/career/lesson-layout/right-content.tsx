import { AnimatePresence, motion } from "framer-motion"
import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import ChallengeSection from "./challenge-section"
import getDuolingoColors from "../../../utils/get-duolingo-colors"

// eslint-disable-next-line @typescript-eslint/naming-convention
const ICON_MAP = {
	Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy
}

interface RightContentProps {
	rightContent: RightContent
	color: DuolingoColors
}

export default function RightContent({ rightContent, color }: RightContentProps) {
	const colors = getDuolingoColors(color)

	if (rightContent.type === "image") {
		const IconComponent = ICON_MAP[rightContent.icon as keyof typeof ICON_MAP]
		return (
			<div
				className={cn(
					"flex items-center justify-center h-full",
					"border-2 border-swan rounded-3xl bg-polar my-8"
				)}
				style={{ marginRight: "100px" }}
			>
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
			</div>
		)
	}

	return (
		<div
			className="flex items-center justify-center h-full my-8"
			style={{ paddingRight: "100px" }}
		>
			<AnimatePresence mode="wait">
				<motion.div
					key={`${rightContent.type}-${rightContent.challengeData.challengeUUID}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="h-full w-full border-2 border-swan rounded-3xl bg-polar"
				>
					<ChallengeSection challengeData={rightContent.challengeData} />
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
