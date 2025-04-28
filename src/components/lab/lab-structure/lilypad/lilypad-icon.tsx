"use client"

import isNull from "lodash-es/isNull"
import { useCallback } from "react"
import { BookOpen, ClipboardList, CodeXml } from "lucide-react"
import { ProgressStatus } from "@bluedotrobots/common-ts"

interface Props {
	progress: ProgressStatus
	activityType: UncertainActivityType
}

export default function LilypadIcon(props: Props) {
	const { progress, activityType } = props

	const classes = useCallback(() =>{
		if (isNull(progress)) return "w-11 h-11 text-hare"
		return "w-11 h-11 text-white"
	}, [progress])

	if (activityType === "Reading") {
		return <BookOpen className={classes()} strokeWidth={2.75}/>
	}
	// else if (activityType === "Video") {
	// 	return <Play className={className} />
	// }
	else if (activityType === "Summary") {
		return <ClipboardList className={classes()} />
	} else if (activityType === "Code") {
		return <CodeXml className={classes()} />
	}
	return null
}
