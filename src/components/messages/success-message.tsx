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
				"bg-green-500 dark:bg-green-950 border-0",
				className
			)}
		>
			<div className="flex items-center gap-2">
				<CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-500" />
				<AlertDescription className="flex-1 text-center justify-center text-green-700 dark:text-green-400 text-lg">
					{message}
				</AlertDescription>
			</div>
		</Alert>
	)
}
