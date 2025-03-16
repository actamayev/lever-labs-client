import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabDemoComponent from "../../../../../src/components/lab/demo/lab-demo-component"

export const metadata = createMetadata({
	title: "Blue LEDs Demo",
	// eslint-disable-next-line max-len
	description: "Watch Pip showcase the properties and applications of blue LEDs in this interactive demonstration. Experience the unique characteristics of blue light before diving into the concepts.",
	path: "/lab/led/demo/blue-leds",
	keywords: ["blue LED technology", "interactive light demonstration", "robotics light display"]
})

const ledDemoDeliverables: [string] = [
	"Blue LEDs"
]

export default function BlueLEDsDemoPage() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Blue LEDs"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
			blockId="intro-to-code-5"
		/>
	)
}
