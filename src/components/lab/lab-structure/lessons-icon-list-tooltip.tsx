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
							"flex size-12 items-center justify-center rounded-lg duration-100 hover:bg-sidebarButtonHover",
							isActive && "bg-sidebarButtonHover"
						)}
					>
						{children}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" className="text-gray-100 dark:text-gray-900">
					{tooltipMessage}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
