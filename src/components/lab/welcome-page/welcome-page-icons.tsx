/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback } from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

interface IconStepProps {
	icon: LucideIcon
	bgColor?: string
	iconColor?: string
	darkBgColor?: string
	darkIconColor?: string
	iconSize?: string
	backgroundSize?: string
	title: string
	subtitle?: string
	orbitingIcons?: React.ReactNode
	elementLink?: ElementLabPages
}

export function IconStep({
	icon: Icon,
	bgColor = "bg-blue-100",
	iconColor = "text-blue-600",
	darkBgColor = "dark:bg-blue-900/50",
	darkIconColor = "dark:text-blue-400",
	iconSize = "size-10",
	backgroundSize = "size-24",
	title,
	subtitle,
	orbitingIcons,
	elementLink
}: IconStepProps) {
	const navigate = useTypedNavigate()

	const navigateToElement = useCallback(() => {
		if (!elementLink) return
		navigate(elementLink)
	}, [elementLink, navigate])

	return (
		<div
			className={cn(
				"flex flex-col items-center group",
				elementLink ? "cursor-pointer" : ""
			)}
			onClick={navigateToElement}
		>
			<div className="relative mb-4">
				<div
					className={cn(
						"rounded-full flex items-center justify-center group-hover:scale-110",
						"transition-transform duration-300",
						bgColor, darkBgColor, backgroundSize
					)}
				>
					<Icon className={cn(iconColor, darkIconColor, iconSize)}/>
				</div>
				{orbitingIcons}
			</div>
			<div className="flex flex-col items-center space-y-1">
				<div className="w-52 text-center">
					<span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 text-center block">
						{title}
					</span>
				</div>
				{subtitle && (
					<div className="w-52 text-center mt-1">
						<span className="text-xs text-zinc-500 dark:text-zinc-400 text-center block">
							{subtitle}
						</span>
					</div>
				)}
			</div>
		</div>
	)
}
