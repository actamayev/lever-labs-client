"use client"

import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"LED counting loop"
]

export default function LEDCountingLoop() {
	return (
		<LabDemoComponent
			lessonDemoTitle="LED counting loop"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
