import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"Blue LEDs"
]

export default function BlueLEDs() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Blue LEDs"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
