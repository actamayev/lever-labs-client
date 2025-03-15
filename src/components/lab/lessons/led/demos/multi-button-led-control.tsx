"use client"

import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"Multi-button LED control"
]

export default function MultiButtonLEDControl() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Multi-button LED control"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
