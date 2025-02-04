import { observer } from "mobx-react"
import ActivityFooter from "./activity-footer"
import { cn } from "../../../lib/shadcn/utils"
import ActivityHeader from "./activity-header/activity-header"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
	activityTitle: string
	activityType: ActivityType
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	children: React.ReactNode
	extraClasses?: string
}

function ActivityTemplate(props: Props) {
	const {
		activityTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonTitle,
		lessonProgressPercent,
		children,
		extraClasses = "",
		activityType,
	} = props

	const labReadingClass = useLabReadingContext()

	return (
		<div className={cn("flex flex-col h-screen min-h-0", extraClasses)}>
			<ActivityHeader
				element={element}
				activityTitle={activityTitle}
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

			{(activityType !== "Reading" || labReadingClass.readingProgressPercentage === 100) && (
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

export default observer(ActivityTemplate)
