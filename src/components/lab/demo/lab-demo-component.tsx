import DemoCard from "./demo-card"
import ActivityTemplate from "../activity-structure/activity-template"

interface Props {
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	lessonDemoTitle: string
    demoDeliverables: string[]
    demos: Demo[]
}

export default function LabDemoComponent(props: Props) {
	const {
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
			lessonTitle={lessonTitle}
			lessonProgressPercent={lessonProgressPercent}
			previousPageLink={null}
			previousPageActivity={null}
			previousPageTooltip={null}
			nextPageLink={null}
			nextPageActivity={null}
			nextPageTooltip={null}
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
