import { observer } from "mobx-react"
import { cn } from "../lib/shadcn/utils"
import { TactileButton } from "./shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"

interface Props {
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
	extraClasses?: string
	children: React.ReactNode
	shadowHeight?: 2 | 4
	disabled?: boolean
}

export const BlueTactileButton = observer((props: Props) => {
	const { onClick, extraClasses, children, disabled, shadowHeight = 2 } = props
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<TactileButton
			onClick={onClick}
			className={cn(
				"flex items-center transition-none border-2 rounded-2xl",
				"bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-50 ",
				"dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-950",
				extraClasses
			)}
			shadowColor={defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"}
			shadowHeight={shadowHeight}
			disabled={disabled}
		>
			{children}
		</TactileButton>
	)
})
