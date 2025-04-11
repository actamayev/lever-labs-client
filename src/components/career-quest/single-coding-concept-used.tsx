"use client"

import { Binary, Repeat2, SquareFunction, Variable } from "lucide-react"
import CustomTooltip from "../custom-tooltip"
import { CustomConditional } from "../icons/custom-conditional"

const codingConceptIcons: Record<CodingConceptName, React.ReactNode> = {
	"Variables": <Variable />,
	"Loops": <Repeat2 />,
	"Conditional Statements": <CustomConditional />,
	"Functions": <SquareFunction />,
	"Boolean Logic": <Binary />
}

export default function SingleCodingConceptUsed({ codingConcept } : { codingConcept: CodingConceptName }) {
	return (
		<CustomTooltip
			tooltipTrigger={
				<div
					key={codingConcept}
					className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center hover:bg-teal-700"
					title={codingConcept}
				>
					{codingConceptIcons[codingConcept]}
				</div>
			}
			tooltipContent={codingConcept}
		/>
	)
}
