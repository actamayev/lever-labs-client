"use client"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
	tooltipTrigger: React.ReactNode
	tooltipContent: React.ReactNode
	contentSide?: "bottom" | "top" | "right" | "left" | undefined
}

export default function CustomTooltip(props: Props): React.ReactNode {
	const { tooltipTrigger, tooltipContent, contentSide } = props

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					{tooltipTrigger}
				</TooltipTrigger>
				<TooltipContent side={contentSide}>
					{tooltipContent}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
