import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabDemoComponent from "../../../../../src/components/lab/demo/lab-demo-component"

// Skip server rendering for this component
const ledDemoDeliverables: [string] = [
	"First Light"
]

export const metadata = createMetadata({
	title: "First Light LED Demo",
	// eslint-disable-next-line max-len
	description: "See Pip's LED technology in action with this introductory demonstration. Watch as pre-programmed light sequences showcase what you'll learn to create yourself.",
	path: "/lab/led/demo/first-light",
	keywords: ["LED demonstration", "robotics preview", "interactive learning"]
})

export default function FirstLightDemoPage() {
	return (
		<LabDemoComponent
			lessonDemoTitle="First Light"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
			blockId="voltage-3"
		/>
	)
}
