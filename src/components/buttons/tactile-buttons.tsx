"use client"

import * as React from "react"
import { observer } from "mobx-react"
import { cn } from "../../lib/utils"
import { ButtonProps } from "../ui/button"
import { TactileButton } from "./tactile-button"
import personalInfoClass from "../../classes/personal-info-class"

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
					"flex items-center duration-0 rounded-2xl",
					"bg-blue-100 text-blue-800",
					"dark:bg-blue-900 dark:text-blue-200",
					className,
					!isPressed ? "" :
						"active:shadow-[0_0_0_0_var(--shadow-color)] active:translate-y-0 \
						shadow-[0_0_0_0_var(--shadow-color)] hover:shadow-[0_0_0_0_var(--shadow-color)] hover:translate-y-0 \
						cursor-default bg-blue-300  text-blue-950 \
						dark:bg-blue-950 dark:text-blue-200"
				)}
				shadowColor={personalInfoClass.defaultSiteTheme === "light" ? "rgb(96 165 250)" : "rgb(37 99 235)"}
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
					"flex items-center transition-none rounded-2xl bg-standard-background!",
					"text-eel dark:text-wolf",
					className
				)}
				shadowColor={personalInfoClass.defaultSiteTheme === "light" ? "rgb(229 229 229)" : "rgb(55 70 79)"}
				shadowHeight={shadowHeight}
				{...props}
			/>
		)
	}
))
