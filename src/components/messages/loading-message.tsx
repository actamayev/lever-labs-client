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
			className={cn("dark:border-blue-500/50", className)}
		>
			<div className="flex items-center gap-2">
				<Spinner size={size} className="text-blue-500" />
				<AlertDescription className="flex-1 text-center">
					{message}
				</AlertDescription>
			</div>
		</Alert>
	)
}
