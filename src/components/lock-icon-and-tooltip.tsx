"use client"

import { Lock } from "lucide-react"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shadcn/ui/tooltip"
import { Button } from "./shadcn/ui/button"

export default function LockIconAndTooltip() {
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="h-auto p-1.5 hover:bg-polar"
					>
						<Lock className="!h-7 !w-7" />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					Encrypted
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
