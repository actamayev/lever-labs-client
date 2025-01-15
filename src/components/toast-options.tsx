import { toast } from "react-toastify"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"

interface ToastOptions {
	title: string
	description?: string
	action?: React.ReactNode
	duration?: number
}

export default function useToastOptions() {
	const defaultSiteTheme = useDefaultSiteTheme()

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

	const superPositive = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast(
			createToastContent(title, description, action),
			{
				autoClose: duration,
				className: "!bg-green-500 !text-white !border-green-600 font-bold",
				closeButton: true,
				pauseOnHover: true,
				draggable: true,
				theme: defaultSiteTheme
			}
		)
	}

	const positive = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast(
			createToastContent(title, description, action),
			{
				autoClose: duration,
				className: "!bg-blue-500 !text-white !border-blue-600 font-bold",
				closeButton: true,
				pauseOnHover: true,
				draggable: true,
				theme: defaultSiteTheme
			}
		)
	}

	const neutral = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast(
			createToastContent(title, description, action),
			{
				autoClose: duration,
				closeButton: true,
				pauseOnHover: true,
				draggable: true,
				theme: defaultSiteTheme
			}
		)
	}

	const negative = ({ title, description, action, duration = 5000 }: ToastOptions) => {
		toast.error(
			createToastContent(title, description, action),
			{
				autoClose: duration,
				closeButton: true,
				pauseOnHover: true,
				draggable: true,
				theme: defaultSiteTheme
			}
		)
	}

	return {
		superPositive,
		positive,
		neutral,
		negative
	}
}
