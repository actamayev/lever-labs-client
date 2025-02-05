import LabDemoComponent from "../../demo/lab-demo-component"
import { labDemos, ledDemoDeliverables } from "./led-demo-blocks"

export default function LedDemo() {
	return (
		<LabDemoComponent
			demoTitle="LED Demo"
			previousPageLink="/lab/element-1/led/reading"
			previousPageActivity="Reading"
			nextPageLink="/lab/element-1/led/video"
			nextPageActivity="Video"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="LED Demo"
			demoDeliverables={ledDemoDeliverables}
			demos={labDemos}
		/>
	)
}
