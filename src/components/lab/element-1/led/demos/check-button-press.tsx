import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"Check button press"
]

export default function CheckButtonPress() {
	return (
		<LabDemoComponent
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			lessonDemoTitle="Check Button Press"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
