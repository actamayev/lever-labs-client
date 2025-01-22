/* eslint-disable no-nested-ternary */
import { isNull } from "lodash-es"
import { useCallback } from "react"
import { CheckCircle, Lock } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

interface Props {
  lessonProgress: number | null // number is lesson progress (percentage, null means locked)
  lessonUrl: LabPages
  lessonName: string
}

export default function Lilypad(props: Props) {
	const { lessonProgress, lessonUrl, lessonName } = props
	const navigate = useTypedNavigate()

	const navigateToLesson = useCallback(() => {
		if (isNull(lessonProgress)) return
		navigate(lessonUrl)
	}, [lessonProgress, lessonUrl, navigate])

	const lilypadVariants = useCallback(() => cn(
		// Base styles
		"w-24 h-24 rounded-full flex items-center justify-center transform transition-all duration-50",
		// Shadow and press effect (similar to tactile button variant)
		isNull(lessonProgress) && [
			"bg-gray-300 cursor-not-allowed",
			"shadow-[0_4px_0_0_rgb(156,163,175)]", // gray shadow
		],
		lessonProgress === 100 && [
			"bg-green-500 cursor-pointer hover:translate-y-0.5",
			"shadow-[0_4px_0_0_rgb(22,163,74)]", // green shadow
			"active:translate-y-1 active:shadow-[0_0_0_0_rgb(22,163,74)]",
		],
		!isNull(lessonProgress) && lessonProgress < 100 && [
			"bg-blue-500 cursor-pointer hover:translate-y-0.5",
			"shadow-[0_4px_0_0_rgb(30,64,175)]", // blue shadow
			"active:translate-y-1 active:shadow-[0_0_0_0_rgb(30,64,175)]",
		],
	), [lessonProgress])

	return (
		<div className="flex flex-col items-center gap-3">
			<button
				className={lilypadVariants()}
				onClick={navigateToLesson}
				disabled={isNull(lessonProgress)}
			>
				{isNull(lessonProgress) ? (
					<Lock className="w-10 h-10 text-gray-500" />
				) : lessonProgress === 100 ? (
					<CheckCircle className="w-10 h-10 text-white" />
				) : (
					<div className="w-10 h-10 rounded-full bg-white/90" />
				)}
			</button>
			<span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">
				{lessonName}
			</span>
		</div>
	)
}
