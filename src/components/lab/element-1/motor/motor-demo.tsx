import LabDemoComponent from "../../demo/lab-demo-component"
import MotorSpinAnimation from "../../../icon-animations/motor-spin-animation"

export default function MotorDemo() {
	return (
		<LabDemoComponent
			demoTitle="Motor Demo"
			previousPageLink="/lab/element-1/led/summary"
			previousPageActivity="Summary"
			nextPageLink="/lab/element-1/led/reading"
			nextPageActivity="Reading"
			element={1}
			lessonIcon={<MotorSpinAnimation iconSize={30} />}
			progressPercent={0 / 6}
		/>
	)
}
