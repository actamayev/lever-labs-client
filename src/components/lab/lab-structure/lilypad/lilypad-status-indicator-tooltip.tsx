import { useMemo } from "react"
import isNull from "lodash-es/isNull"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"

interface Props {
	progress: number | null
	children: React.ReactNode
}

export default function LilypadStatusIndicatorTooltip(props: Props) {
	const { progress, children } = props

	const tooltipMessage = useMemo(() => {
		if (isNull(progress)) return "Please complete previous lessons to unlock"
		else if (progress === 100) return "Complete"
		return "In progress"
	}, [progress])

	// TODO: Fix warning in console logs
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger >
					{children}
				</TooltipTrigger>
				<TooltipContent side="top" className="text-zinc-100 dark:text-zinc-900">
					{tooltipMessage}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
