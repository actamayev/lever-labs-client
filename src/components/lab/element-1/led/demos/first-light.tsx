// import { Rainbow } from "lucide-react"
import LabDemoComponent from "../../../demo/lab-demo-component"

const ledDemoDeliverables: [string] = [
	"First Light"
]

export default function FirstLight() {
	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="First Light"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
		/>
	)
}
