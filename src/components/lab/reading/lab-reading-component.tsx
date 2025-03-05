import ReadingContainer from "./reading-container"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	previousPageTooltip: string | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	nextPageTooltip: string | null
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	readingBlocks: ContentBlock[]
	readingName: ReadingNames
}

export default function LabReadingComponent(props: Props) {
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
		readingBlocks,
		readingName
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
			activityType="Reading"
		>
			<main className="h-full overflow-hidden">
				<ReadingContainer blocks={readingBlocks} readingName={readingName}/>
			</main>
		</ActivityTemplate>
	)
}
