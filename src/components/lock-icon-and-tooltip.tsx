import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import { Button } from "./shadcn/ui/button"
import { FaLock } from "react-icons/fa6"

export default function LockIconAndTooltip() {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="h-auto p-1 dark:hover:bg-zinc-700"
					>
						<FaLock className="h-4 w-4" />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="top">
					Encrypted
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
