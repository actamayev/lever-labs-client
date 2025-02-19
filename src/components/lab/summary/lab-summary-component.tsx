import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	summaryTitle: string
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	nextPageLink: LabPages | null
	nextPageActivity: ActivityType | null
	element: ElementNumbers
	lessonTitle: Element1Lessons
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
		lessonTitle,
		lessonProgressPercent,
	} = props
	return (
		<ActivityTemplate
			element={element}
			activityTitle={summaryTitle}
			lessonTitle={lessonTitle}
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
