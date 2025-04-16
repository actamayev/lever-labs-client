"use client"
import * as Blockly from "blockly"
import { createCustomCategory } from "../../../../../../utils/blockly/toolbox-config"
import LabCodeComponent from "../../../../code/lab-code-component"
import { ledCategoryColour } from "../../../../../../utils/constants"
import { LED_BLOCK_TYPES } from "../../../../../../utils/blockly/block-types/led-block-types"

export default function BreathingLEDsCodeClient() {
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
			nextPageLink="/lab/led/reading/led-advantages"
			nextPageTooltip="GPIO"
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			codingTitle="Breathing LEDs"
			codingDescription="Coding Description"
			toolboxConfig={toolboxConfig}
		/>
	)
}
