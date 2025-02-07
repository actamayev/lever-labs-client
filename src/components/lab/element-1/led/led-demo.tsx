import LabDemoComponent from "../../demo/lab-demo-component"
import { labDemos, ledDemoDeliverables } from "./led-demo-blocks"

export default function LedDemo() {
	return (
		<LabDemoComponent
			demoTitle="LED Demo"
			previousPageLink={null}
			previousPageActivity={null}
			nextPageLink="/lab/element-1/led/reading"
			nextPageActivity="Reading"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="LED Demo"
			demoDeliverables={ledDemoDeliverables}
			demos={labDemos}
		/>
	)
}
