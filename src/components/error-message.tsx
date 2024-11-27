import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "./shadcn/ui/alert"

interface Props {
	error: string
}

export default function ErrorMessage({ error }: Props) {
	return (
		<Alert variant="destructive" className="dark:text-red-500 dark:border-red-500">
			<div className="flex items-center gap-2">
				<AlertCircle className="h-4 w-4 flex-shrink-0" />
				<AlertDescription className="flex-1 text-center">
					{error}
				</AlertDescription>
			</div>
		</Alert>
	)
}
