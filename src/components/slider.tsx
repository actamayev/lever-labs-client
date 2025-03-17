"use client"

import { Switch } from "@/components/shadcn/ui/switch"
import { cn } from "../lib/shadcn/utils"

interface SliderProps {
	checkedCondition: boolean
	onChangeCheckedCondition: () => void
	disabledCondition?: boolean
	colorChangeOnToggle?: boolean
	id?: string
	className?: string
	size?: "default" | "lg" | "xl"
  }

export default function Slider(props: SliderProps) {
	const {
		checkedCondition,
		onChangeCheckedCondition,
		disabledCondition,
		colorChangeOnToggle,
		id,
		className,
		size = "default"
	} = props

	const sizeClasses = {
		default: "h-5 w-9", // default sizes
		lg: "h-6 w-11", // larger size
		xl: "h-7 w-14", // extra large size
	}

	return (
		<Switch
			id={id}
			checked={checkedCondition}
			onCheckedChange={onChangeCheckedCondition}
			disabled={disabledCondition}
			className={cn(
				"dark:bg-gray-600",
				sizeClasses[size],
				className,
				colorChangeOnToggle && "data-[state=checked]:bg-gray-900 dark:data-[state=checked]:bg-gray-100",
				// Add thumb size adjustments here
				size === "lg" && "[&>span]:h-5 [&>span]:w-5 [&>span]:data-[state=checked]:translate-x-5",
				size === "xl" && "[&>span]:h-6 [&>span]:w-6 [&>span]:data-[state=checked]:translate-x-7"
			)}
		/>
	)
}
