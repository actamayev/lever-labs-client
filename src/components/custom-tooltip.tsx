import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"

interface Props {
	tooltipTrigger: React.ReactNode
	tooltipContent: React.ReactNode
	contentSide?: "bottom" | "top" | "right" | "left" | undefined
}

export default function CustomTooltip(props: Props) {
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
