import isNull from "lodash-es/isNull"
import { useCallback } from "react"
import LilypadIcon from "./lilypad-icon"
import { cn } from "../../../../lib/shadcn/utils"
import useLilypadVariants from "../../../../hooks/lab/lilypad-variants"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"
import LilypadStatusIndicatorTooltip from "./lilypad-status-indicator-tooltip"

export default function Lilypad({ activity } : { activity: FullActivity }) {
	const { activityStatus, activityUrl, activityName, activityType, arcDirection } = activity
	const navigate = useTypedNavigate()
	const lilypadVariants = useLilypadVariants()

	const navigateToLesson = useCallback(() => {
		if (isNull(activityStatus)) return
		navigate(activityUrl)
	}, [activityStatus, activityUrl, navigate])

	return (
		<LilypadStatusIndicatorTooltip activityStatus={activityStatus}>
			<div
				className={cn(
					"flex flex-col items-center gap-3 group",
					!isNull(activityStatus) ? "group cursor-pointer" : "cursor-default"
				)}
				onClick={navigateToLesson}
			>
				<button
					className={lilypadVariants(activityStatus)}
					disabled={isNull(activityStatus)}
					data-lilypad-icon
					data-arc-direction={arcDirection}
					style={{
						width: "96px",
						height: "89px"
					}}
				>
					<LilypadIcon
						activityType={activityType}
						progress={activityStatus}
					/>
				</button>
				<span
					className={cn(
						"font-medium text-sm text-zinc-700 dark:text-zinc-300",
						isNull(activityStatus) ? "cursor-default" : "cursor-pointer"
					)}
				>
					{activityName}
				</span>
			</div>
		</LilypadStatusIndicatorTooltip>
	)
}
