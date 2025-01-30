import { ReactElement, useState } from "react"
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
	lessonProgressPercent: number
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
		lessonProgressPercent
	} = props
	const [readingProgressPercentage, setReadingProgressPercentage] = useState(0)

	return (
		<ActivityTemplate
			element={element}
			lessonTitle={readingTitle}
			lessonIcon={lessonIcon}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			activityType="Reading"
			readingProgressPercentage={readingProgressPercentage}
		>
			<main className="h-full overflow-hidden">
				<ReadingContainer
					blocks={ledReadingBlocks}
					readingProgressPercentage={readingProgressPercentage}
					setReadingProgressPercentage={setReadingProgressPercentage}
				/>
			</main>
		</ActivityTemplate>
	)
}
