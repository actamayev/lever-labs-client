import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy } from "lucide-react"
import ChallengeSection from "./challenge-section"

// eslint-disable-next-line @typescript-eslint/naming-convention
const ICON_MAP = {
	Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle, Trophy
}

interface RightContentProps {
	rightContent: RightContent
}

export default function RightContent({ rightContent }: RightContentProps) {
	if (rightContent.type === "image") {
		const IconComponent = ICON_MAP[rightContent.icon as keyof typeof ICON_MAP]
		return (
			<div className="flex items-center justify-center h-full">
				<IconComponent size={120} className="text-macaw" />
			</div>
		)
	}

	return (
		<div className="h-full flex flex-col">
			<ChallengeSection challengeData={rightContent.challengeData} />
		</div>
	)
}
