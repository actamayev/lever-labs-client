"use client"

import { Lock } from "lucide-react"
import { Button } from "./shadcn/ui/button"
import CustomTooltip from "./custom-tooltip"

export default function LockIconAndTooltip(): React.ReactNode {
	return (
		<CustomTooltip
			tooltipTrigger={
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="h-auto p-1.5 hover:bg-swan"
				>
					<Lock className="h-7! w-7!" />
				</Button>
			}
			tooltipContent="ENCRYPTED"
		/>
	)
}
