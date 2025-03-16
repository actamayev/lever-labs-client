import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabDemoComponent from "../../../../../src/components/lab/demo/lab-demo-component"

export const metadata = createMetadata({
	title: "Multi-Button LED Control Demo",
	// eslint-disable-next-line max-len
	description: "Control LEDs using multiple buttons in this advanced interactive demo. Learn complex input management and create responsive lighting patterns with Pip.",
	path: "/lab/led/demo/multi-button-led-control",
	keywords: ["multiple input handling", "advanced LED programming", "interactive robotics controls"]
})

const ledDemoDeliverables: [string] = [
	"Multi-Button LED Control"
]

export default function MultiButtonLEDControlDemoPage() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Multi-Button LED Control"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
			blockId="intro-to-code-8"
		/>
	)
}
