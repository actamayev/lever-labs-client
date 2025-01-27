import { ReactElement } from "react"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	startTitle: string
	previousPageLink: LabPages | null
	previousPageActivity: ActivityType | null
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement | null
	progressPercent: number
	isNextPageDemo?: boolean
}

export default function LabStartComponent(props: Props) {
	const {
		startTitle,
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
			lessonTitle={startTitle}
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
				Start
			</main>
		</ActivityTemplate>
	)
}
