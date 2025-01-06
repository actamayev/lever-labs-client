import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "../shadcn/ui/alert"
import { cn } from "../../lib/shadcn/utils"

interface SuccessMessageProps {
  message: string
  className?: string
}

export default function SuccessMessage({
	message,
	className
}: SuccessMessageProps) {
	return (
		<Alert
			variant="default"
			className={cn(
				"border-green-500/50 bg-green-500/10 dark:border-green-500/30 dark:bg-green-500/5",
				className
			)}
		>
			<div className="flex items-center gap-2">
				<CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-500" />
				<AlertDescription className="flex-1 text-center text-green-700 dark:text-green-400">
					{message}
				</AlertDescription>
			</div>
		</Alert>
	)
}
