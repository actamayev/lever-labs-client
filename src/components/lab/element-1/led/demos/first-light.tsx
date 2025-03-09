// import { Rainbow } from "lucide-react"
import LabDemoComponent from "../../../demo/lab-demo-component"

const ledDemoDeliverables: [string] = [
	"First Light"
]

// eslint-disable-next-line max-len
//In this demo, when you press the button, you're applying voltage to Pip's LEDs - just like adding water to the lake at the top of the cliff. The 3.3V you're applying is giving electrons the 'push' they need to cross the P-N junction and create light. Notice how the light appears instantly when you press the button - this is because electron flow happens at incredibly high speeds, making LEDs perfect for precise robot control.
export default function FirstLight() {
	return (
		<LabDemoComponent
			lessonDemoTitle="First Light"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
		/>
	)
}
