"use client"

import { useMemo } from "react"
import isNull from "lodash-es/isNull"
import CustomTooltip from "../../../custom-tooltip"

interface Props {
	activityStatus: ProgressStatus
	children: React.ReactNode
}

export default function LilypadStatusIndicatorTooltip(props: Props) {
	const { activityStatus, children } = props

	const tooltipMessage = useMemo(() => {
		if (isNull(activityStatus)) return "Please complete previous lessons to unlock"
		else if (activityStatus === "COMPLETED") return "Complete"
		return "In progress"
	}, [activityStatus])

	return (
		<CustomTooltip
			tooltipTrigger={children}
			contentSide="top"
			tooltipContent={tooltipMessage}
		/>
	)
}
