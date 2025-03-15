"use client"

import { useMemo } from "react"
import isNull from "lodash-es/isNull"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"

interface Props {
	activityStatus: ProgressStatus
	children: React.ReactNode
}

export default function LilypadStatusIndicatorTooltip(props: Props) {
	const { activityStatus, children } = props

	const tooltipMessage = useMemo(() => {
		if (isNull(activityStatus)) return "Please complete previous lessons to unlock"
		else if (activityStatus === "COMPLETED") return "Complete"
		return "In progress"
	}, [activityStatus])

	// 2/15/25 TODO: Fix warning in console logs
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger >
					{children}
				</TooltipTrigger>
				<TooltipContent side="top" className="text-gray-100 dark:text-gray-900">
					{tooltipMessage}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
