import { ReactElement } from "react"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	readingTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: 1 | 2 | 3
	lessonIcon: ReactElement
	progressPercent: number
	isNextPageDemo?: boolean
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
		isNextPageDemo = false
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
			isNextPageDemo={isNextPageDemo}
			extraClasses="h-screen"
		>
			<main className="flex-1 flex items-center justify-center p-4">
				Reading
			</main>
		</ActivityTemplate>
	)
}
