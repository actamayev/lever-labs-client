import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	nextPageLink?: LabPages
	nextPageActivity?: ActivityType
	nextPageTooltip?: string
	lessonTitle: LessonNames
	lessonProgressPercent: number
}

export default function LabSummaryComponent(props: Props) {
	const {
		nextPageLink,
		nextPageActivity,
		nextPageTooltip,
		lessonTitle,
		lessonProgressPercent,
	} = props
	return (
		<ActivityTemplate
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
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
