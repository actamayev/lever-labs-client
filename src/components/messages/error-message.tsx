import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "../shadcn/ui/alert"

interface Props {
	error: string
	className?: string
}

export default function ErrorMessage(props: Props) {
	const { error, className } = props

	return (
		<Alert variant="destructive" className="dark:text-red-500 dark:border-red-500 min-h-12">
			<div className="flex items-center justify-center gap-2">
				<AlertCircle className="h-7 w-7 flex-shrink-0" />
				<AlertDescription className="flex-1 text-center justify-center text-xl">
					{error}
				</AlertDescription>
			</div>
		</Alert>
	)
}
