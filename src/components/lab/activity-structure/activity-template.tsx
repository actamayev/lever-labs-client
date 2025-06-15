"use client"

import { observer } from "mobx-react"
import ActivityFooter from "./activity-footer"
import { cn } from "../../../lib/shadcn/utils"
import ActivityHeader from "./activity-header/activity-header"
import labReadingClass from "../../../classes/lab-reading-class"
import { ActivityType } from "@bluedotrobots/common-ts"

interface Props {
	activityType: ActivityType
	nextPageLink?: LabPages
	nextPageActivity?: ActivityType
	nextPageTooltip?: string
	lessonTitle: LessonNames
	lessonProgressPercent: number
	children: React.ReactNode
}

function ActivityTemplate(props: Props) {
	const {
		nextPageLink,
		nextPageActivity,
		nextPageTooltip,
		lessonTitle,
		lessonProgressPercent,
		children,
		activityType
	} = props

	return (
		<div className="flex flex-col h-screen min-h-0">
			<ActivityHeader
				lessonTitle={lessonTitle}
				lessonProgressPercent={lessonProgressPercent}
				activityType={activityType}
			/>

			<div
				className={cn(
					"flex-1 min-h-0 pt-20",
					((labReadingClass.readingProgressPercentage === 100) || (activityType === "Code")) && "pb-20"
				)}
			>
				{children}
			</div>

			{
				(nextPageActivity && nextPageLink) &&
				(activityType !== "Reading" || labReadingClass.readingProgressPercentage === 100) &&
			(
				<ActivityFooter
					nextPageLink={nextPageLink}
					nextPageActivity={nextPageActivity}
					nextPageTooltip={nextPageTooltip}
				/>
			)}
		</div>
	)
}

export default observer(ActivityTemplate)
