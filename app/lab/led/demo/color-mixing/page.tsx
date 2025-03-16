import { createMetadata } from "../../../../../src/utils/helmet-data/create-metadata"
import LabDemoComponent from "../../../../../src/components/lab/demo/lab-demo-component"

export const metadata = createMetadata({
	title: "Color Mixing with LEDs Demo",
	// eslint-disable-next-line max-len
	description: "Watch how Pip blends red, green, and blue light to create a rainbow of colors in this pre-programmed demonstration. See RGB color theory in action before learning the concepts.",
	path: "/lab/led/demo/color-mixing",
	keywords: ["RGB color demonstration", "LED color blending", "visual color mixing"]
})

const ledDemoDeliverables: [string] = [
	"Color Mixing"
]

export default function ColorMixingDemoPage() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Color Mixing"
			demoDeliverables={ledDemoDeliverables}
			demos={[]}
		/>
	)
}
