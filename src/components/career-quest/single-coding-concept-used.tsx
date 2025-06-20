"use client"

import { Binary, Repeat2, SquareFunction, Variable } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import CustomTooltip from "../custom-tooltip"
import { CustomConditional } from "../icons/custom-conditional"
import { getDuolingoColorVariant } from "../../utils/duolingo-utils"

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
}

export default function SingleCodingConceptUsed(props: Props) {
	const { codingConcept, baseColor } = props

	const bgColorClass = getDuolingoColorVariant(baseColor, "bg", 1)

	return (
		<CustomTooltip
			tooltipTrigger={
				<div
					key={codingConcept}
					className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", bgColorClass)}
					title={codingConcept}
				>
					{codingConceptIcons[codingConcept]}
				</div>
			}
			tooltipContent={codingConcept}
		/>
	)
}
