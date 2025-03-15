"use client"

import * as Blockly from "blockly"
import LabCodeComponent from "../../../code/lab-code-component"
import { createCustomCategory } from "../../../../../utils/blockly/toolbox-config"

export default function BreathingLEDs() {
	const ledBlocks = createCustomCategory(
		"Pip",
		218,
		["esp32_led_control"]
	)
	const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
		kind: "categoryToolbox",
		contents: [ledBlocks]
	}
	return (
		<LabCodeComponent
			nextPageActivity="Reading"
			nextPageLink="/lab/led/reading/gpio"
			nextPageTooltip="GPIO"
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			codingTitle="Breathing LEDs"
			codingDescription="Coding Description"
			toolboxConfig={toolboxConfig}
		/>
	)
}
