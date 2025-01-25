import LabDemoComponent from "../../demo/lab-demo-component"
import LEDColorChangeAnimation from "../../../icon-animations/led-color-change-animation"

export default function LedDemo() {
	return (
		<LabDemoComponent
			demoTitle="LED Demo"
			previousPageLink="/lab/element-1/led/reading"
			previousPageActivity="Reading"
			nextPageLink="/lab/element-1/led/video"
			nextPageActivity="Video"
			element={1}
			lessonIcon={<LEDColorChangeAnimation iconSize={30} />}
			progressPercent={40}
		/>
	)
}
