import ReadingContainer from "./reading-container"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	nextPageTooltip: string
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	readingBlocks: ContentBlock[]
	readingName: ReadingNames
}

export default function LabReadingComponent(props: Props) {
	const {
		nextPageLink,
		nextPageActivity,
		nextPageTooltip,
		lessonTitle,
		lessonProgressPercent,
		readingBlocks,
		readingName
	} = props
	return (
		<ActivityTemplate
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			nextPageTooltip={nextPageTooltip}
			activityType="Reading"
		>
			<main className="h-full overflow-hidden">
				<ReadingContainer blocks={readingBlocks} readingName={readingName}/>
			</main>
		</ActivityTemplate>
	)
}
