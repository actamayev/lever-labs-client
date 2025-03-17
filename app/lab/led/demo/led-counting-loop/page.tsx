import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabDemoComponent from "../../../../../src/components/lab/demo/lab-demo-component"

export const metadata = createMetadata({
	title: "LED Counting Loop Demo",
	// eslint-disable-next-line max-len
	description: "See LEDs in action with counting loops in this programming demonstration. Watch as Pip demonstrates sequential lighting patterns using efficient loop structures.",
	path: "/lab/led/demo/led-counting-loop",
	keywords: ["sequential light patterns", "counting with LEDs", "loop programming visualization"]
})

const ledDemoDeliverables: [string] = [
	"LED Counting Loop"
]

export default function LEDCountingLoopDemoPage() {
	return (
		<LabDemoComponent
			lessonDemoTitle="LED Counting Loop"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
			blockId="leds-and-loops-3"
		/>
	)
}
