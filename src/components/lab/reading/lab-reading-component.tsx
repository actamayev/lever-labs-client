import ReadingContainer from "./reading-container"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	readingBlocks: ContentBlock[]
}

export default function LabReadingComponent(props: Props) {
	const {
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonTitle,
		lessonProgressPercent,
		readingBlocks
	} = props
	return (
		<ActivityTemplate
			element={element}
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			activityType="Reading"
		>
			<main className="h-full overflow-hidden">
				<ReadingContainer blocks={readingBlocks} labLesson={lessonTitle}/>
			</main>
		</ActivityTemplate>
	)
}
