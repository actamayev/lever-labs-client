import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabDemoComponent from "../../../../../src/components/lab/demo/lab-demo-component"

export const metadata = createMetadata({
	title: "LED Breathing Demo",
	// eslint-disable-next-line max-len
	description: "Create a breathing effect with LEDs in this visually appealing demonstration. Learn how to manipulate light intensity to simulate organic lighting behaviors with Pip.",
	path: "/lab/led/demo/led-breathing",
	keywords: ["LED light intensity control", "pulsing light effects", "gradual brightness changes"]
})

const ledDemoDeliverables: [string] = [
	"LED Breathing Effect"
]

export default function LEDBreathingDemoPage() {
	return (
		<LabDemoComponent
			lessonDemoTitle="LED Breathing Effect"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
		/>
	)
}
