"use client"
import * as Blockly from "blockly"
import { createCustomCategory } from "../../../../../../utils/blockly/toolbox-config"
import LabCodeComponent from "../../../../code/lab-code-component"
import { pipCategoryColour } from "../../../../../../utils/constants"

export default function BreathingLEDsCodeClient() {
	const ledBlocks = createCustomCategory(
		"LED",
		pipCategoryColour,
		["esp32_led_control"]
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
