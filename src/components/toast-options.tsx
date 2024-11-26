import { useToast } from "../hooks/shadcn/use-toast"
import { type ToastActionElement } from "./shadcn/ui/toast"

interface ToastOptions {
    title?: string
    description: string
    action?: ToastActionElement
    duration?: number
}

export default function useStyledToast() {
	const { toast } = useToast()

	const superPositive = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast({
			title,
			description,
			action,
			duration,
			className: "bg-green-500 text-white border-green-600 text-bold",
			// Style any action buttons to match the toast theme
			// classNameActions: "text-white hover:text-green-200"
		})
	}

	const positive = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast({
			title,
			description,
			action,
			duration,
			className: "bg-blue-500 text-white border-blue-600",
			// classNameActions: "text-white hover:text-blue-200"
		})
	}

	const neutral = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast({
			title,
			description,
			action,
			duration
			// Uses default shadcn styling
		})
	}

	const negative = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast({
			title,
			description,
			action,
			duration,
			variant: "destructive"
		})
	}

	return {
		superPositive,
		positive,
		neutral,
		negative
	}
}
