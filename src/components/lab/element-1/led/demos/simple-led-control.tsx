import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"Simple LED control"
]

export default function SimpleLEDControl() {
	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="Simple LED control"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
