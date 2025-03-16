import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabDemoComponent from "../../../../../src/components/lab/demo/lab-demo-component"

export const metadata = createMetadata({
	title: "Button Press LED Demo",
	// eslint-disable-next-line max-len
	description: "Learn to control LEDs with button presses in this interactive demonstration. Watch as Pip responds to physical inputs by changing light patterns and colors.",
	path: "/lab/led/demo/check-button-press",
	keywords: ["button input control", "interactive LED programming", "physical computing demonstration"]
})

const ledDemoDeliverables: [string] = [
	"Check button press"
]

export default function ButtonPressLEDsDemoPage() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Check button press"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
		/>
	)
}
