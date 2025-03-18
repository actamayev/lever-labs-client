"use client"

import { cn } from "../../lib/shadcn/utils"
import { Spinner } from "../shadcn/ui/spinner"
import { Alert, AlertDescription } from "../shadcn/ui/alert"

interface LoadingMessageProps {
  message?: string
  className?: string
  size?: "small" | "medium" | "large"
}

export default function LoadingMessage({
	message = "Loading...",
	className,
	size = "small"
}: LoadingMessageProps) {
	return (
		<Alert
			variant="default"
			className={cn("bg-macaw dark:bg-blue-950 border-0", className)}
		>
			<div className="flex items-center gap-2">
				<Spinner size={size} className="text-macaw h-6 w-6" />
				<AlertDescription className="flex-1 text-center justify-center text-lg">
					{message}
				</AlertDescription>
			</div>
		</Alert>
	)
}
