"use client"

import { useRef } from "react"
import { toast, ToastOptions as ReactToastifyOptions, Id } from "react-toastify"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"

// Rename our options interface to avoid conflict with react-toastify's ToastOptions
interface CustomToastOptions {
	title: string
	description?: string
	action?: React.ReactNode
	duration?: number
}

// eslint-disable-next-line max-lines-per-function
export default function useToastOptions() {
	const defaultSiteTheme = useDefaultSiteTheme()
	// Keep track of whether a toast is currently active
	const isToastActiveRef = useRef(false)

	const createToastContent = (
		title: string,
		description: string | undefined,
		action: React.ReactNode | undefined
	) => (
		<div className="flex flex-col w-full">
			<div className="flex justify-between items-center w-full">
				<div className="flex flex-col gap-1">
					{title && <div className="font-semibold text-[1.05em]">{title}</div>}
					{description && <div className="text-sm">{description}</div>}
				</div>
				{action && <div className="mx-4 flex-shrink-0">{action}</div>}
			</div>
		</div>
	)

	// Helper function to display a toast only if no toast is active
	const showToastIfNotActive = <TData,>(
		toastFn: (content: React.ReactNode, options?: ReactToastifyOptions<TData>) => Id,
		content: React.ReactNode,
		options: ReactToastifyOptions<TData>
	) => {
		if (isToastActiveRef.current) {
			// If a toast is already active, don't create a new one
			return null
		}

		// Set active flag to true
		isToastActiveRef.current = true

		// Create the toast with the provided function and options
		const toastId = toastFn(content, {
			...options,
			onClose: () => {
				// When toast closes, reset the active flag
				isToastActiveRef.current = false
				// Call the original onClose if provided
				if (options.onClose) options.onClose()
			}
		})

		return toastId
	}

	const superPositive = ({ title, description, action, duration = 5000 }: CustomToastOptions) => {
		const content = createToastContent(title, description, action)
		const options: ReactToastifyOptions = {
			autoClose: duration,
			className: "!bg-green-500 !text-white !border-green-600 font-bold",
			closeButton: true,
			pauseOnHover: true,
			draggable: true,
			theme: defaultSiteTheme
		}

		return showToastIfNotActive(toast, content, options)
	}

	const positive = ({ title, description, action, duration = 5000 }: CustomToastOptions) => {
		const content = createToastContent(title, description, action)
		const options: ReactToastifyOptions = {
			autoClose: duration,
			className: "!bg-macaw !text-white !border-blue-600 font-bold",
			closeButton: true,
			pauseOnHover: true,
			draggable: true,
			theme: defaultSiteTheme
		}

		return showToastIfNotActive(toast, content, options)
	}

	const neutral = ({ title, description, action, duration = 5000 }: CustomToastOptions) => {
		const content = createToastContent(title, description, action)
		const options: ReactToastifyOptions = {
			autoClose: duration,
			closeButton: true,
			pauseOnHover: true,
			draggable: true,
			theme: defaultSiteTheme
		}

		return showToastIfNotActive(toast, content, options)
	}

	const negative = ({ title, description, action, duration = 5000 }: CustomToastOptions) => {
		const content = createToastContent(title, description, action)
		const options: ReactToastifyOptions = {
			autoClose: duration,
			closeButton: true,
			pauseOnHover: true,
			draggable: true,
			theme: defaultSiteTheme
		}

		return showToastIfNotActive(toast.error, content, options)
	}

	// Add a function to clear the active toast flag manually if needed
	const clearToastActive = () => {
		isToastActiveRef.current = false
	}

	return {
		superPositive,
		positive,
		neutral,
		negative,
		clearToastActive
	}
}
