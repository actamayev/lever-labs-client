import { isNull } from "lodash-es"
import { useCallback } from "react"
import { cn } from "../../../lib/shadcn/utils"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import LilypadIcon from "./lilypad-icon"

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
		// Shadow and press effect (similar to tactile button variant)
		isNull(progress) && [
			"bg-gray-300 cursor-not-allowed",
			"shadow-[0_4px_0_0_rgb(156,163,175)]", // gray shadow
		],
		progress === 100 && [
			"bg-green-500 cursor-pointer hover:translate-y-0.5",
			"shadow-[0_4px_0_0_rgb(22,163,74)]", // green shadow
			"active:translate-y-1 active:shadow-[0_0_0_0_rgb(22,163,74)]",
		],
		!isNull(progress) && progress < 100 && [
			"bg-blue-500 cursor-pointer hover:translate-y-0.5",
			"shadow-[0_4px_0_0_rgb(30,64,175)]", // blue shadow
			"active:translate-y-1 active:shadow-[0_0_0_0_rgb(30,64,175)]",
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
				{/* {isNull(progress) ? (
					<Lock className="w-10 h-10 text-gray-500" />
				) : progress === 100 ? (
					<CheckCircle className="w-10 h-10 text-white" />
				) : (
					<div className="w-10 h-10 rounded-full bg-white/90" />
				)} */}
			</button>
			<span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">
				{lessonName}
			</span>
		</div>
	)
}
