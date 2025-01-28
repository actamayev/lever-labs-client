import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider
} from "@/components/shadcn/ui/tooltip"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"

interface Props {
	tooltipMessage: string
	children: React.ReactNode
	onClick: () => void
	isActive: boolean
}

export default function LessonsIconListTooltip(props: Props) {
	const { tooltipMessage, children, onClick, isActive } = props

	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger onClick={onClick}>
					<Button
						variant="ghost"
						className={cn(
							"flex size-12 items-center justify-center rounded-lg duration-100",
							isActive ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
						)}
					>
						{children}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" className="text-zinc-100 dark:text-zinc-900">
					{tooltipMessage}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
