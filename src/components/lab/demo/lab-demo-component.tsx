import { observer } from "mobx-react"
import { useNavigate } from "react-router"
import { useCallback } from "react"
import DemoCard from "./demo-card"
import DemoTemplate from "../activity-structure/demo-template"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import { usePageTransitionContext } from "../../../contexts/page-transition-context"

interface Props {
	lessonDemoTitle: string
    demoDeliverables: string[]
    demos: Demo[]
}

function LabDemoComponent(props: Props) {
	const {
		lessonDemoTitle,
		demoDeliverables,
		demos,
	} = props
	const navigate = useNavigate()
	const pageTransitionClass = usePageTransitionContext()

	const goBack = useCallback(() => {
		pageTransitionClass.setDirection("up")
		navigate(-1)
	}, [navigate, pageTransitionClass])

	return (
		<DemoTemplate>
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
				>
					CONTINUE
				</BlueTactileButton>
			</main>
		</DemoTemplate>
	)
}

export default observer(LabDemoComponent)
