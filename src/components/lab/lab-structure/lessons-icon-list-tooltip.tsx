import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"
import { Button } from "../../shadcn/ui/button"

interface Props {
	tooltipMessage: string
	children: React.ReactNode
	onClick: () => void
}

export default function LessonsIconListTooltip(props: Props) {
	const { tooltipMessage, children, onClick } = props

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger onClick={onClick}>
					<Button
						variant="ghost"
						className="flex size-12 items-center justify-center rounded-lg
						hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-100"
					>
						{children}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="top" className="text-zinc-100 dark:text-zinc-900">
					{tooltipMessage}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
