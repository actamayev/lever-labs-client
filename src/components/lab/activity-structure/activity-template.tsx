import { ReactElement } from "react"
import ActivityHeader from "./activity-header/activity-header"
import ActivityFooter from "./activity-footer"
import { cn } from "../../../lib/shadcn/utils"

interface Props {
	lessonTitle: string
	activityType: ActivityType
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement | null
	lessonProgressPercent: number
	children: React.ReactNode
	extraClasses?: string
	readingProgressPercentage?: number
}

export default function ActivityTemplate(props: Props) {
	const {
		lessonTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonIcon,
		lessonProgressPercent,
		children,
		extraClasses = "",
		activityType,
		readingProgressPercentage
	} = props

	return (
		<div className={cn("flex flex-col h-screen min-h-0", extraClasses)}>
			<ActivityHeader
				element={element}
				lessonTitle={lessonTitle}
				lessonIcon={lessonIcon}
				lessonProgressPercent={lessonProgressPercent}
				activityType={activityType}
				readingProgressPercentage={readingProgressPercentage}
			/>

			<div
				className={cn(
					"flex-1 min-h-0 pt-20",
					(readingProgressPercentage === 100 || activityType.includes("Code")) && "pb-20"
				)}
			>
				{children}
			</div>

			{(activityType !== "Reading" || readingProgressPercentage === 100) && (
				<ActivityFooter
					previousPageLink={previousPageLink}
					previousPageActivity={previousPageActivity}
					nextPageLink={nextPageLink}
					nextPageActivity={nextPageActivity}
				/>
			)}
		</div>
	)
}
