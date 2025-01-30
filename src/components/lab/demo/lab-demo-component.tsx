import { ReactElement } from "react"
import { observer } from "mobx-react"
import { usePipContext } from "../../../contexts/pip-context"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	demoTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonIcon: ReactElement
	lessonProgressPercent: number
}

function LabDemoComponent(props: Props) {
	const {
		demoTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonIcon,
		lessonProgressPercent,
	} = props
	const pipClass = usePipContext()

	return (
		<ActivityTemplate
			element={element}
			lessonTitle={demoTitle}
			lessonIcon={lessonIcon}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			activityType="Demo"
		>
			<main className="flex-1 flex items-center justify-center p-4">
				Demo:&nbsp;
				{pipClass.doesUserHaveAPip ? (
					<>You have a Pip</>
				) : (
					<>You do not have a Pip</>
				)}
			</main>
		</ActivityTemplate>
	)
}

export default observer(LabDemoComponent)
