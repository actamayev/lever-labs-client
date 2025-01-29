import { ReactElement } from "react"
import ReadingContainer from "./reading-container"
import ledReadingBlocks from "../element-1/led/led-reading-blocks"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	readingTitle: string
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement
	progressPercent: number
}

export default function LabReadingComponent(props: Props) {
	const {
		readingTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonIcon,
		progressPercent,
	} = props
	return (
		<ActivityTemplate
			element={element}
			lessonTitle={readingTitle}
			lessonIcon={lessonIcon}
			progressPercent={progressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
		>
			<main className="h-full overflow-hidden">
				<ReadingContainer blocks={ledReadingBlocks} />
			</main>
		</ActivityTemplate>
	)
}
