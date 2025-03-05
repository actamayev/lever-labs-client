import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"Multi-button LED control"
]

export default function MultiButtonLEDControl() {
	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="Multi-button LED control"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
