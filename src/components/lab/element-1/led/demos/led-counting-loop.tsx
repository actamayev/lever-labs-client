import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"LED counting loop"
]

export default function LEDCountingLoop() {
	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="LED counting loop"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
