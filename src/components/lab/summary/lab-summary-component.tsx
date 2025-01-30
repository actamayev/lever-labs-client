import { ReactElement } from "react"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	summaryTitle: string
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement | null
	lessonProgressPercent: number
}

export default function LabSummaryComponent(props: Props) {
	const {
		summaryTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonIcon,
		lessonProgressPercent,
	} = props
	return (
		<ActivityTemplate
			element={element}
			lessonTitle={summaryTitle}
			lessonIcon={lessonIcon}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			activityType="Summary"
		>
			<main className="flex-1 flex items-center justify-center p-4">
				Summary
			</main>
		</ActivityTemplate>
	)
}
