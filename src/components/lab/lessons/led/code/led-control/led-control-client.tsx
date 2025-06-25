"use client"

import * as Blockly from "blockly"
import { createCustomCategory } from "../../../../../../utils/blockly/toolbox-config"
import LabCodeComponent from "../../../../code/lab-code-component"
import { ledCategoryColour } from "../../../../../../utils/constants/constants"
import { LED_BLOCK_TYPES } from "@bluedotrobots/common-ts"

export default function LEDControlClient() {
	const ledBlocks = createCustomCategory(
		"LED",
		ledCategoryColour,
		[LED_BLOCK_TYPES.ESP32_LED_CONTROL]
	)
	const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
		kind: "categoryToolbox",
		contents: [ledBlocks]
	}
	return (
		<LabCodeComponent
			nextPageActivity="Reading"
			nextPageLink="/lab/led/reading/leds-and-loops"
			nextPageTooltip="LEDs and Loops"
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			codingTitle="Coding Title"
			codingDescription="Coding Description"
			toolboxConfig={toolboxConfig}
		/>
	)
}
