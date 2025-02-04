import LabDemoComponent from "../../demo/lab-demo-component"

export default function MotorDemo() {
	return (
		<LabDemoComponent
			demoTitle="Motor Demo"
			previousPageLink="/lab/element-1/led/summary"
			previousPageActivity="Summary"
			nextPageLink="/lab/element-1/led/reading"
			nextPageActivity="Reading"
			element={1}
			lessonTitle="Motor"
			lessonProgressPercent={0 / 6}
		/>
	)
}
