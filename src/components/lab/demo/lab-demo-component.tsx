import DemoCard from "./demo-card"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	demoTitle: string
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
		element,
		lessonTitle,
		lessonProgressPercent,
		lessonDemoTitle,
		demoDeliverables,
		demos,
	} = props
	return (
		<ActivityTemplate
			element={element}
			activityTitle={demoTitle}
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={null}
			nextPageLink={null}
			previousPageActivity={null}
			nextPageActivity={null}
			activityType="Demo"
			isDemo={true}
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
