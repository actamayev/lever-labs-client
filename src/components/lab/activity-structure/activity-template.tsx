import { observer } from "mobx-react"
import ActivityFooter from "./activity-footer"
import { cn } from "../../../lib/shadcn/utils"
import ActivityHeader from "./activity-header/activity-header"
import { useLabReadingContext } from "../../../contexts/lab-reading-context"

interface Props {
	activityType: ActivityType
	nextPageLink: LabPages | null
	nextPageActivity: ActivityType | null
	nextPageTooltip: string | null
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	children: React.ReactNode
	extraClasses?: string
	isDemo?: boolean
}

function ActivityTemplate(props: Props) {
	const {
		nextPageLink,
		nextPageActivity,
		nextPageTooltip,
		element,
		lessonTitle,
		lessonProgressPercent,
		children,
		extraClasses = "",
		activityType,
		isDemo = false
	} = props

	const labReadingClass = useLabReadingContext()

	return (
		<div className={cn("flex flex-col h-screen min-h-0", extraClasses)}>
			<ActivityHeader
				element={element}
				lessonTitle={lessonTitle}
				lessonProgressPercent={lessonProgressPercent}
				activityType={activityType}
				isDemo={isDemo}
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
