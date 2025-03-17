"use client"

import { CustomWheel } from "../../../../icons/custom-wheel"
import LabDemoComponent from "../../../demo/lab-demo-component"
import useMotorDemoUseEffect from "../../../../../hooks/lab/demos/motor-demo-use-effect"

const ledDemoDeliverables: [string] = [
	"LED Light Show"
]

const ledDemos: [Demo] = [
	{
		demoTitle: "Real-time motor control",
		demoDescription: "Drive Pip around using arrow keys",
		demoIcon: CustomWheel
	}
]

export default function LEDLightShow() {
	useMotorDemoUseEffect()

	return (
		<LabDemoComponent
			lessonDemoTitle="LED Light Show"
			demoDeliverables={ledDemoDeliverables}
			demos={ledDemos}
			blockId="intro-to-leds-2"
		/>
	)
}
