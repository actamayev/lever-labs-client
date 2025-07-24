import Link from "next/link"
import { cn } from "../../lib/shadcn/utils"
import { getDuolingoColors } from "../../utils/duolingo-utils"
import { TactileButton } from "../shadcn/ui/tactile-button"

interface Props {
	baseColor: DuolingoColors
	lessonsComplete: number
	careerUrl: CareerQuestPages
}

export default function StartButton(props: Props) {
	const { baseColor, lessonsComplete, careerUrl } = props
	const colors = getDuolingoColors(baseColor)

	return (
		<Link href={careerUrl} className="flex-1">
			<TactileButton
				className={cn("duration-150 bg-white h-10 rounded-full text-base w-full", colors.text2)}
				shadowClass={colors.shadow}
				shadowHeight={4}
			>
				{lessonsComplete === 0 ? "START" : "CONTINUE"}
			</TactileButton>
		</Link>
	)
}
