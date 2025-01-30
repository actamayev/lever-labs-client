import { ReactElement } from "react"
import ActivityHeader from "./activity-header"
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
	shouldShowFooter?: boolean
	extraClasses?: string
	isCode?: boolean
	isReading?: boolean
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
		shouldShowFooter = true,
		activityType
	} = props
	// 1/29/25 TODO: Add styles for when the footer is not shown

	return (
		<div className={cn("flex flex-col h-screen min-h-0", extraClasses)}>
			<ActivityHeader
				element={element}
				lessonTitle={lessonTitle}
				lessonIcon={lessonIcon}
				lessonProgressPercent={lessonProgressPercent}
				activityType={activityType}
			/>

			<div className="flex-1 min-h-0 pt-20 pb-20">
				{children}
			</div>

			{shouldShowFooter && (
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
