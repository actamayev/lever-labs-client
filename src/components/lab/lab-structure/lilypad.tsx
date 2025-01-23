import { isNull } from "lodash-es"
import { useCallback } from "react"
import LilypadIcon from "./lilypad-icon"
import { cn } from "../../../lib/shadcn/utils"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

interface Props {
	lesson: Lesson
}

export default function Lilypad(props: Props) {
	const { lesson } = props
	const { progress, lessonUrl, lessonName, activityType } = lesson
	const navigate = useTypedNavigate()

	const navigateToLesson = useCallback(() => {
		if (isNull(progress)) return
		navigate(lessonUrl)
	}, [progress, lessonUrl, navigate])

	const lilypadVariants = useCallback(() => cn(
		// Base styles
		"w-24 h-24 rounded-full flex items-center justify-center transform transition-all duration-50",
		// Shadow and press effect
		isNull(progress) && [
			"bg-gray-300 cursor-not-allowed",
			"shadow-[0_7px_0_0_rgb(156,163,175)]", // gray shadow
		],
		progress === 100 && [
			"bg-green-500 cursor-pointer",
			"shadow-[0_7px_0_0_rgb(22,163,74)]", // default state
			"hover:shadow-[0_5px_0_0_rgb(22,163,74)]", // slightly compressed on hover
			"hover:transform hover:translate-y-0.5", // move down slightly to match shadow
			"active:shadow-[0_0_0_0_rgb(22,163,74)]", // fully compressed on click
			"active:transform active:translate-y-2 duration-0", // move down to match shadow
		],
		!isNull(progress) && progress < 100 && [
			"bg-blue-500 cursor-pointer",
			"shadow-[0_7px_0_0_rgb(30,64,175)]", // default state
			"hover:shadow-[0_5px_0_0_rgb(30,64,175)]", // slightly compressed on hover
			"hover:transform hover:translate-y-0.5", // move down slightly to match shadow
			"active:shadow-[0_0_0_0_rgb(30,64,175)]", // fully compressed on click
			"active:transform active:translate-y-2 duration-0", // move down to match shadow
		],
	), [progress])

	return (
		<div className="flex flex-col items-center gap-3">
			<button
				className={lilypadVariants()}
				onClick={navigateToLesson}
				disabled={isNull(progress)}
			>
				<LilypadIcon
					activityType={activityType}
					progress={progress}
				/>
			</button>
			<span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">
				{lessonName}
			</span>
		</div>
	)
}
