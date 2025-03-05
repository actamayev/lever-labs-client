import { observer } from "mobx-react"
import { useNavigate } from "react-router"
import { useCallback, useState } from "react"
import DemoCard from "./demo-card"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import ActivityTemplate from "../activity-structure/activity-template"
import { usePageTransitionContext } from "../../../contexts/page-transition-context"

interface Props {
	element: ElementNumbers
	lessonTitle: Element1Lessons
	lessonProgressPercent: number
	lessonDemoTitle: string
    demoDeliverables: string[]
    demos: Demo[]
}

function LabDemoComponent(props: Props) {
	const {
		element,
		lessonTitle,
		lessonProgressPercent,
		lessonDemoTitle,
		demoDeliverables,
		demos,
	} = props
	const [isContinued, setIsContinued] = useState(false)
	const navigate = useNavigate()
	const pageTransitionClass = usePageTransitionContext()

	const goBack = useCallback(() => {
		pageTransitionClass.setDirection("up")
		setIsContinued(true)
		navigate(-1)
	}, [navigate, pageTransitionClass])

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
			<main className="flex-1 flex items-center flex-col justify-center p-4">
				<DemoCard
					lessonDemoTitle={lessonDemoTitle}
					demoDeliverables={demoDeliverables}
					demos={demos}
				/>
				<BlueTactileButton
					onClick={goBack}
					className="px-6 !py-5 text-3xl w-3/4 h-16 mt-12"
					shadowHeight={4}
					isPressed={isContinued}
				>
					CONTINUE
				</BlueTactileButton>
			</main>
		</ActivityTemplate>
	)
}

export default observer(LabDemoComponent)
