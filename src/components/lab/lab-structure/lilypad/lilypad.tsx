import isNull from "lodash-es/isNull"
import { useCallback } from "react"
import LilypadIcon from "./lilypad-icon"
import { cn } from "../../../../lib/shadcn/utils"
import useLilypadVariants from "../../../../hooks/lab/lilypad-variants"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import LilypadStatusIndicatorTooltip from "./lilypad-status-indicator-tooltip"

interface Props {
	lesson: Activity
}

export default function Lilypad(props: Props) {
	const { lesson } = props
	const { progress, activityUrl, lessonName, activityType, arcDirection } = lesson
	const navigate = useTypedNavigate()
	const lilypadVariants = useLilypadVariants()

	const navigateToLesson = useCallback(() => {
		if (isNull(progress)) return
		navigate(activityUrl)
	}, [progress, activityUrl, navigate])

	return (
		<LilypadStatusIndicatorTooltip progress={progress}>
			<div
				className={cn(
					"flex flex-col items-center gap-3 group",
					!isNull(progress) ? "group cursor-pointer" : "cursor-default"
				)}
				onClick={navigateToLesson}
			>
				<button
					className={lilypadVariants(progress)}
					disabled={isNull(progress)}
					data-lilypad-icon
					data-arc-direction={arcDirection}
				>
					<LilypadIcon
						activityType={activityType}
						progress={progress}
					/>
				</button>
				<span
					className={cn(
						"font-medium text-sm text-zinc-700 dark:text-zinc-300",
						isNull(progress) ? "cursor-default" : "cursor-pointer"
					)}
				>
					{lessonName}
				</span>
			</div>
		</LilypadStatusIndicatorTooltip>
	)
}
