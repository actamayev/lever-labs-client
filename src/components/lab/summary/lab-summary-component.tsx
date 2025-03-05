import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	previousPageTooltip: string | null
	nextPageLink: LabPages | null
	nextPageActivity: ActivityType | null
	nextPageTooltip: string | null
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
}

export default function LabSummaryComponent(props: Props) {
	const {
		previousPageLink,
		previousPageActivity,
		previousPageTooltip,
		nextPageLink,
		nextPageActivity,
		nextPageTooltip,
		element,
		lessonTitle,
		lessonProgressPercent,
	} = props
	return (
		<ActivityTemplate
			element={element}
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			previousPageTooltip={previousPageTooltip}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			nextPageTooltip={nextPageTooltip}
			activityType="Summary"
		>
			<main className="flex-1 flex items-center justify-center p-4">
				Summary
			</main>
		</ActivityTemplate>
	)
}
