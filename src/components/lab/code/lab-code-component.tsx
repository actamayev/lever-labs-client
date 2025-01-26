import { ReactElement } from "react"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	lessonTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: 1 | 2 | 3
	lessonIcon: ReactElement
	progressPercent: number
	isNextPageDemo?: boolean
	codingTitle: string
	codingDescription: string
}

export default function LabCodeComponent(props: Props) {
	const {
		lessonTitle,
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
			lessonTitle={lessonTitle}
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
				Code
			</main>
		</ActivityTemplate>
	)
}
