"use client"

import LabDemoComponent from "../../../demo/lab-demo-component"

const demoDeliverables: [string] = [
	"Check button press"
]

export default function CheckButtonPress() {
	return (
		<LabDemoComponent
			lessonDemoTitle="Check Button Press"
			demoDeliverables={demoDeliverables}
			demos={[]}
		/>
	)
}
