"use client"

import * as React from "react"
import { observer } from "mobx-react"
import { cn } from "../../lib/shadcn/utils"
import { ButtonProps } from "../shadcn/ui/button"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import getPersonalInfoClass from "../../classes/personal-info-class"

type ColoredTactileButtonProps = Omit<ButtonProps, "variant"> & {
	shadowHeight?: 2 | 4
	isPressed?: boolean
}

export const BlueTactileButton = observer(React.forwardRef<HTMLButtonElement, ColoredTactileButtonProps>(
	({ className, shadowHeight = 4, isPressed, ...props }, ref): React.ReactNode => {
		return (
			<TactileButton
				ref={ref}
				className={cn(
					"flex items-center duration-150 rounded-2xl",
					"bg-blue-100 text-blue-800",
					"dark:bg-blue-900 dark:text-blue-200",
					className,
					!isPressed ? "" :
						"active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-0 \
						shadow-[0_0_0_0_var(--shadow-color)] hover:shadow-[0_0_0_0_var(--shadow-color)] hover:translate-y-0 \
						cursor-default bg-blue-300  text-blue-950 \
						dark:bg-blue-950 dark:text-blue-200"
				)}
				shadowColor={getPersonalInfoClass().defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"}
				shadowHeight={shadowHeight}
				{...props}
			/>
		)
	}
))

export const BlackWhiteTactileButton = observer(React.forwardRef<HTMLButtonElement, ColoredTactileButtonProps>(
	({ className, shadowHeight = 4, ...props }, ref): React.ReactNode => {
		return (
			<TactileButton
				ref={ref}
				className={cn(
					"flex items-center transition-none rounded-2xl !bg-standardBackground",
					"text-eel dark:text-wolf",
					className
				)}
				shadowColor={getPersonalInfoClass().defaultSiteTheme === "light" ? "rgb(229 229 229)" : "rgb(55 70 79)"}
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
	({ children, navigateTo, ...props }, ref): React.ReactNode => { // Add ref parameter here
		const navigate = useTypedNavigate()
		return (
			<TactileButton
				ref={ref} // Add this line to pass the ref to TactileButton
				onClick={(): void => navigate(navigateTo)}
				className={cn(
					"px-4 sm:px-6 md:px-8 text-lg sm:text-xl md:text-2xl duration-150",
					"rounded-xl sm:rounded-2xl border-2 w-full md:w-2/3",
					"h-auto min-h-10 md:min-h-12 whitespace-normal",
					"bg-green-500 border-none text-white",
					"dark:bg-green-900 dark:border-green-600 dark:text-green-200"
				)}
				shadowColor={getPersonalInfoClass().defaultSiteTheme === "light" ? "rgb(34, 160, 94)" : "rgb(22 163 74)"}
				{...props}
			>
				{children}
			</TactileButton>
		)
	}
))
