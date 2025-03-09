import LabDemoComponent from "../../../demo/lab-demo-component"

const ledDemoDeliverables: [string] = [
	"Color Mixing"
]

export default function ColorMixing() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Color Mixing"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
		/>
	)
}
