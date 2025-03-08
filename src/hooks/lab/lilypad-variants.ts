import isNull from "lodash-es/isNull"
import { useCallback } from "react"
import { cn } from "../../lib/shadcn/utils"

export default function useLilypadVariants(): (progress: ProgressStatus) => string {
	return useCallback((progress) => cn(
		// Base styles with explicit oval shape
		"rounded-[50%] flex items-center justify-center transform transition-all duration-50 relative", // Changed to 50% for a smooth oval
		// Shadow and press effect
		isNull(progress) && [
			"bg-lilypadLightBackgroundDisabled dark:bg-lilypadDarkBackground",
			"shadow-[0_10px_0_0_rgb(183,183,183)] dark:shadow-[0_10px_0_0_rgb(43,56,63)]", // gray shadow
		],
		progress === "COMPLETED" && [
			"bg-green-500 cursor-pointer",
			"shadow-[0_10px_0_0_rgb(22,163,74)]", // default state
			"group-hover:shadow-[0_8px_0_0_rgb(22,163,74)]", // slightly compressed on hover
			"group-hover:transform group-hover:translate-y-0.5", // move down slightly to match shadow
			"group-active:shadow-[0_0_0_0_rgb(22,163,74)]", // fully compressed on click
			"group-active:transform group-active:translate-y-2.5 duration-0", // move down to match shadow
		],
		!isNull(progress) && progress === "IN_PROGRESS" && [
			"bg-lilypadBlueBackground cursor-pointer",
			"shadow-[0_10px_0_0_rgb(49,145,203)]", // default state
			"group-hover:shadow-[0_8px_0_0_rgb(49,145,203)]", // slightly compressed on hover
			"group-hover:transform group-hover:translate-y-0.5", // move down slightly to match shadow
			"group-active:shadow-[0_0_0_0_rgb(49,145,203)]", // fully compressed on click
			"group-active:transform group-active:translate-y-2.5 duration-0", // move down to match shadow
		]
	), [])
}
