/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback } from "react"
import { LucideIcon } from "lucide-react"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import { SubIconSubtitleText, SubIconTitleText } from "./sub-icon-text"

interface IconStepProps {
	icon: LucideIcon
	bgColor?: string
	iconColor?: string
	darkBgColor?: string
	darkIconColor?: string
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
			className={`flex flex-col items-center group ${elementLink ? "cursor-pointer" : ""}`}
			onClick={navigateToElement}
		>
			<div className="relative mb-4">
				<div
					className={`w-24 h-24 rounded-full ${bgColor} ${darkBgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
				>
					<Icon className={`w-10 h-10 ${iconColor} ${darkIconColor}`} />
				</div>
				{orbitingIcons}
			</div>
			<div className="flex flex-col items-center space-y-1">
				<SubIconTitleText text={title} />
				{subtitle && <SubIconSubtitleText text={subtitle} />}
			</div>
		</div>
	)
}
