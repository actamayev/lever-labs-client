import { useToast } from "../hooks/shadcn/use-toast"
import { type ToastActionElement } from "./shadcn/ui/toast"

interface ToastOptions {
    title?: string
    description: string
    action?: ToastActionElement
    duration?: number
}

export default function useStyledToast() {
	const { toast, dismiss } = useToast()

	const superPositive = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast({
			title,
			description,
			action,
			duration,
			className: "bg-green-500 text-white border-green-600 text-bold",
			onOpenChange: (open) => {
				if (open) {
					setTimeout(() => {
						dismiss()
					}, duration)
				}
			}
		})
	}

	const positive = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast({
			title,
			description,
			action,
			duration,
			className: "bg-blue-500 text-white border-blue-600",
			onOpenChange: (open) => {
				if (open) {
					setTimeout(() => {
						dismiss()
					}, duration)
				}
			}
		})
	}

	const neutral = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast({
			title,
			description,
			action,
			duration,
			onOpenChange: (open) => {
				if (open) {
					setTimeout(() => {
						dismiss()
					}, duration)
				}
			}
		})
	}

	const negative = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast({
			title,
			description,
			action,
			duration,
			variant: "destructive",
			onOpenChange: (open) => {
				if (open) {
					setTimeout(() => {
						dismiss()
					}, duration)
				}
			}
		})
	}

	return {
		superPositive,
		positive,
		neutral,
		negative
	}
}
