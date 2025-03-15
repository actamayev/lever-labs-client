"use client"

import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"LED Breathing"
]

export default function LEDBreathing() {
	return (
		<LabDemoComponent
			lessonDemoTitle="LED Breathing"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
