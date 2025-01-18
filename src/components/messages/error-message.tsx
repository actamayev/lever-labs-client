import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "../shadcn/ui/alert"

interface Props {
	error: string
}

export default function ErrorMessage(props: Props) {
	const { error } = props

	return (
		<Alert variant="destructive" className="dark:text-red-400 border-0">
			<div className="flex items-center justify-center gap-2">
				<AlertCircle className="h-6 w-6 flex-shrink-0" />
				<AlertDescription className="flex-1 text-center justify-center text-lg">
					{error}
				</AlertDescription>
			</div>
		</Alert>
	)
}
