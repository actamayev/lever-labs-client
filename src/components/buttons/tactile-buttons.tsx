import * as React from "react"
import { cn } from "../../lib/shadcn/utils"
import { ButtonProps } from "../shadcn/ui/button"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

type ColoredTactileButtonProps = Omit<ButtonProps, "variant"> & {
	shadowHeight?: 2 | 4
}

export const BlueTactileButton = React.forwardRef<HTMLButtonElement, ColoredTactileButtonProps>(
	({ className, shadowHeight = 2, ...props }, ref) => {
		const defaultSiteTheme = useDefaultSiteTheme()

		return (
			<TactileButton
				ref={ref}
				className={cn(
					"flex items-center transition-none border-2 rounded-2xl",
					"bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-50",
					"dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:bg-blue-950",
					className
				)}
				shadowColor={defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"}
				shadowHeight={shadowHeight}
				{...props}
			/>
		)
	}
)

export const BlackWhiteTactileButton = React.forwardRef<HTMLButtonElement, ColoredTactileButtonProps>(
	({ className, shadowHeight = 2, ...props }, ref) => {
		const defaultSiteTheme = useDefaultSiteTheme()

		return (
			<TactileButton
				ref={ref}
				className={cn(
					"flex items-center transition-none border-2 rounded-2xl",
					"bg-zinc-100 border-zinc-400 text-zinc-800 hover:bg-zinc-50",
					"dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-950",
					className
				)}
				shadowColor={defaultSiteTheme === "light" ? "rgb(161 161 170)" : "rgb(82 82 91)"}
				shadowHeight={shadowHeight}
				{...props}
			/>
		)
	}
)
