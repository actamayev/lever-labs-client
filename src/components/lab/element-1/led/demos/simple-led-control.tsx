import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"Simple LED control"
]

export default function SimpleLEDControl() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Simple LED control"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
