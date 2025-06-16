// classes/toast-class.ts
import { toast, ToastOptions as ReactToastifyOptions, Id } from "react-toastify"
import personalInfoClass from "./personal-info-class"

interface CustomToastOptions {
	title: string
	description?: string
	action?: React.ReactNode
	duration?: number
}

class ToastClass {
	// Replace useRef with simple class property
	private isToastActive: boolean = false

	private createToastContent = (
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
	private showToastIfNotActive = <TData,>(
		toastFn: (content: React.ReactNode, options?: ReactToastifyOptions<TData>) => Id,
		content: React.ReactNode,
		options: ReactToastifyOptions<TData>
	) => {
		if (this.isToastActive) {
			// If a toast is already active, don't create a new one
			return
		}

		// Set active flag to true
		this.isToastActive = true

		// Create the toast with the provided function and options
		toastFn(content, {
			...options,
			onClose: () => {
				// When toast closes, reset the active flag
				this.isToastActive = false
				// Call the original onClose if provided
				if (options.onClose) options.onClose()
			}
		})

		return
	}

	public superPositive = ({ title, description, action, duration = 5000 }: CustomToastOptions) => {
		const content = this.createToastContent(title, description, action)
		const options: ReactToastifyOptions = {
			autoClose: duration,
			className: "!bg-green-500 !text-white !border-green-600 font-bold",
			closeButton: true,
			pauseOnHover: true,
			draggable: true,
			theme: personalInfoClass.defaultSiteTheme
		}

		return this.showToastIfNotActive(toast, content, options)
	}

	public positive = ({ title, description, action, duration = 5000 }: CustomToastOptions) => {
		const content = this.createToastContent(title, description, action)
		const options: ReactToastifyOptions = {
			autoClose: duration,
			className: "!bg-macaw !text-white !border-blue-600 font-bold",
			closeButton: true,
			pauseOnHover: true,
			draggable: true,
			theme: personalInfoClass.defaultSiteTheme
		}

		return this.showToastIfNotActive(toast, content, options)
	}

	public neutral = ({ title, description, action, duration = 5000 }: CustomToastOptions) => {
		const content = this.createToastContent(title, description, action)
		const options: ReactToastifyOptions = {
			autoClose: duration,
			closeButton: true,
			pauseOnHover: true,
			draggable: true,
			theme: personalInfoClass.defaultSiteTheme
		}

		return this.showToastIfNotActive(toast, content, options)
	}

	public negative = ({ title, description, action, duration = 5000 }: CustomToastOptions) => {
		const content = this.createToastContent(title, description, action)
		const options: ReactToastifyOptions = {
			autoClose: duration,
			closeButton: true,
			pauseOnHover: true,
			draggable: true,
			theme: personalInfoClass.defaultSiteTheme
		}

		return this.showToastIfNotActive(toast.error, content, options)
	}

	// Add a function to clear the active toast flag manually if needed
	public clearToastActive = () => {
		this.isToastActive = false
	}
}

// Export singleton instance
const toastClass = new ToastClass()

export default toastClass
