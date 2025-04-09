"use client"

import LabDemoComponent from "../../../demo/lab-demo-component"
import { CustomLightbulb } from "../../../../icons/custom-lightbulb"

const ledDemoDeliverables: [string] = [
	"LED Light Show"
]

const ledDemos: [Demo] = [
	{
		demoTitle: "LED Light Show",
		demoDescription: "See an LED light show",
		demoIcon: CustomLightbulb
	}
]

export default function LEDLightShow() {
	return (
		<LabDemoComponent
			lessonDemoTitle="LED Light Show"
			demoDeliverables={ledDemoDeliverables}
			demos={ledDemos}
			blockId="intro-to-leds-2"
		/>
	)
}
