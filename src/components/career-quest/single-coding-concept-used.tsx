"use client"

import { Binary, Repeat2, SquareFunction, Variable } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import CustomTooltip from "../custom-tooltip"
import { CustomConditional } from "../../icons/custom-conditional"
import getDuolingoColors from "../../utils/get-duolingo-colors"

const codingConceptIcons: Record<CodingConceptName, React.ReactNode> = {
	"Variables": <Variable />,
	"Loops": <Repeat2 />,
	"Conditional Statements": <CustomConditional />,
	"Functions": <SquareFunction />,
	"Boolean Logic": <Binary />
}

interface Props {
	codingConcept: CodingConceptName
	baseColor: DuolingoColors
	extraClasses?: string
}

export default function SingleCodingConceptUsed(props: Props): React.ReactNode {
	const { codingConcept, baseColor, extraClasses } = props

	const colors = getDuolingoColors(baseColor)

	return (
		<CustomTooltip
			tooltipTrigger={
				<div
					key={codingConcept}
					className={cn(
						"w-10 h-10 rounded-2xl flex items-center justify-center duration-0 border-2 border-white",
						colors.bg1,        // Base background (bg-baseColor-2)
						colors.hoverBg2,    // Hover background (hover:bg-baseColor-3)
						extraClasses
					)}
					title={codingConcept}
				>
					{codingConceptIcons[codingConcept]}
				</div>
			}
			tooltipContent={codingConcept}
		/>
	)
}
