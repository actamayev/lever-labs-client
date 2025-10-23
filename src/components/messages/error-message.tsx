"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "../ui/alert"

interface Props {
	error: string
}

export default function ErrorMessage(props: Props): React.ReactNode {
	const { error } = props

	return (
		<Alert
			variant="destructive"
			className="dark:text-red-400 border-0 justify-items-center text-center"
		>
			<AlertCircle className="h-6 w-6" />
			<AlertDescription className="text-lg">
				{error}
			</AlertDescription>
		</Alert>
	)
}
