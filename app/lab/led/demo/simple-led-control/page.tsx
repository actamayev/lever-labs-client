import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabDemoComponent from "../../../../../src/components/lab/demo/lab-demo-component"

export const metadata = createMetadata({
	title: "Simple LED Control Demo",
	// eslint-disable-next-line max-len
	description: "Master basic LED control techniques with this straightforward demonstration. Watch Pip respond to simple commands and learn foundational robotics lighting principles.",
	path: "/lab/led/demo/simple-led-control",
	keywords: ["beginner LED programming", "basic robot light control", "introductory robotics demo"]
})

const ledDemoDeliverables: [string] = [
	"Simple LED Control"
]

export default function SimpleLEDControlDemoPage() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Simple LED Control"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
			blockId="intro-to-code-7"
		/>
	)
}
