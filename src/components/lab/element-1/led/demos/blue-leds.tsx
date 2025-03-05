import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"Blue LEDs"
]

export default function BlueLEDs() {
	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="Blue LEDs"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
