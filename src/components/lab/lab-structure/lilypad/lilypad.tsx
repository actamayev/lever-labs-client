import { isNull } from "lodash-es"
import { useCallback } from "react"
import LilypadIcon from "./lilypad-icon"
import { cn } from "../../../../lib/shadcn/utils"
import useLilypadVariants from "../../../../hooks/lab/lilypad-variants"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import LilypadStatusIndicatorTooltip from "./lilypad-status-indicator-tooltip"

interface Props {
	lesson: Lesson
}

// TODO: Make hover a state so that hovering on the name of the exercise makes the lilypad go down
export default function Lilypad(props: Props) {
	const { lesson } = props
	const { progress, lessonUrl, lessonName, activityType } = lesson
	const navigate = useTypedNavigate()
	const lilypadVariants = useLilypadVariants()

	const navigateToLesson = useCallback(() => {
		if (isNull(progress)) return
		navigate(lessonUrl)
	}, [progress, lessonUrl, navigate])

	// Tooltip doesn't work
	return (
		<LilypadStatusIndicatorTooltip progress={progress}>
			<div className="flex flex-col items-center gap-3">
				<button
					className={lilypadVariants(progress)}
					onClick={navigateToLesson}
					disabled={isNull(progress)}
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
