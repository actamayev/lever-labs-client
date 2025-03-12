import * as React from "react"
import { observer } from "mobx-react"
import { cn } from "../../lib/shadcn/utils"
import { ButtonProps } from "../shadcn/ui/button"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

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
					"bg-sidebarButtonHover border-gray-400 text-gray-800 hover:bg-gray-50",
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

type LandingCTAProps = ColoredTactileButtonProps & {
	navigateTo: PageNames
}

export const LandingCTAButton = observer(React.forwardRef<HTMLButtonElement, LandingCTAProps>(
	({ ...props }) => {
		const defaultSiteTheme = useDefaultSiteTheme()
		const navigate = useTypedNavigate()
		return (
			<TactileButton
				onClick={() => navigate(props.navigateTo)}
				className={cn("px-8 !py-5 text-2xl transition-none rounded-2xl border-2 w-full md:w-2/3 h-12",
					"bg-green-500 border-none text-white hover:bg-green-400",
					"dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950")}
				shadowColor={defaultSiteTheme === "light" ? "rgb(34, 160, 94)" : "rgb(22 163 74)"}
				shadowHeight={2}
				{...props}
			/>
		)
	}
))
