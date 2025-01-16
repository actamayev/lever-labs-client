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
						className="h-auto p-1.5 dark:hover:bg-zinc-700"
					>
						<FaLock className="!h-7 !w-7" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					Encrypted
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
