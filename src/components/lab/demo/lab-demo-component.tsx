import DemoCard from "./demo-card"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	demoTitle: string
	previousPageLink: LabPages
	previousPageActivity: ActivityType
	nextPageLink: LabPages
	nextPageActivity: ActivityType
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	lessonDemoTitle: string
    demoDeliverables: string[]
    demos: Demo[]
}

export default function LabDemoComponent(props: Props) {
	const {
		demoTitle,
		previousPageLink,
		previousPageActivity,
		nextPageLink,
		nextPageActivity,
		element,
		lessonTitle,
		lessonProgressPercent,
		lessonDemoTitle,
		demoDeliverables,
		demos
	} = props
	return (
		<ActivityTemplate
			element={element}
			activityTitle={demoTitle}
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={previousPageLink}
			previousPageActivity={previousPageActivity}
			nextPageLink={nextPageLink}
			nextPageActivity={nextPageActivity}
			activityType="Demo"
		>
			<main className="flex-1 flex items-center justify-center p-4">
				<DemoCard
					lessonDemoTitle={lessonDemoTitle}
					demoDeliverables={demoDeliverables}
					demos={demos}
				/>
			</main>
		</ActivityTemplate>
	)
}
