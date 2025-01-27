import { isNull } from "lodash-es"
import { useCallback } from "react"
import GetActivityIconFromActivityName from "../get-activity-icon-from-name"

interface Props {
	progress: number | null
	activityType: ActivityType
}

export default function LilypadIcon(props: Props) {
	const { progress, activityType } = props

	const classes = useCallback(() =>{
		if (isNull(progress)) return "w-10 h-10 text-zinc-500"
		return "w-10 h-10 text-white"
	}, [progress])

	return (
		<GetActivityIconFromActivityName
			activityType={activityType}
			className={classes()}
		/>
	)
}
