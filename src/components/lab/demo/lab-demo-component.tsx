import { ReactElement } from "react"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	demoTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement
	progressPercent: number
	isNextPageDemo?: boolean
}

export default function LabDemoComponent(props: Props) {
	const {
		demoTitle,
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
			lessonTitle={demoTitle}
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
				Demo
			</main>
		</ActivityTemplate>
	)
}
