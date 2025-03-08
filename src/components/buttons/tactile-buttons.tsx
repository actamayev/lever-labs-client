import * as React from "react"
import { observer } from "mobx-react"
import { cn } from "../../lib/shadcn/utils"
import { ButtonProps } from "../shadcn/ui/button"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

type ColoredTactileButtonProps = Omit<ButtonProps, "variant"> & {
	shadowHeight?: 2 | 4
	isPressed?: boolean
}

export const BlueTactileButton = observer(React.forwardRef<HTMLButtonElement, ColoredTactileButtonProps>(
	({ className, shadowHeight = 2, isPressed, ...props }, ref) => {
		const defaultSiteTheme = useDefaultSiteTheme()

		return (
			<TactileButton
				ref={ref}
				className={cn(
					"flex items-center transition-none border-2 rounded-2xl",
					"bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-50",
					"dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-950",
					className,
					!isPressed ? "" :
						"active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-0 \
						shadow-[0_0_0_0_var(--shadow-color)] hover:shadow-[0_0_0_0_var(--shadow-color)] hover:translate-y-0 \
						cursor-default bg-blue-300 hover:bg-blue-300 border-blue-400 text-blue-950 \
						dark:bg-blue-950 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-950"
				)}
				shadowColor={defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"}
				shadowHeight={shadowHeight}
				{...props}
			/>
		)
	}
))

export const BlackWhiteTactileButton = observer(React.forwardRef<HTMLButtonElement, ColoredTactileButtonProps>(
	({ className, shadowHeight = 2, ...props }, ref) => {
		const defaultSiteTheme = useDefaultSiteTheme()

		return (
			<TactileButton
				ref={ref}
				className={cn(
					"flex items-center transition-none border-2 rounded-2xl",
					"bg-sidebarButtonHover border-gray-400 text-zinc-800 hover:bg-gray-50",
					"dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-950",
					className
				)}
				shadowColor={defaultSiteTheme === "light" ? "rgb(161 161 170)" : "rgb(82 82 91)"}
				shadowHeight={shadowHeight}
				{...props}
			/>
		)
	}
))
