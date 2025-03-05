import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"LED Breathing"
]

export default function LEDBreathing() {
	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="LED Breathing"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
