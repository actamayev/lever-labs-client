"use client"

import * as Blockly from "blockly"
import { createCustomCategory } from "../../../../../../utils/blockly/toolbox-config"
import LabCodeComponent from "../../../../code/lab-code-component"
import { ledCategoryColour } from "../../../../../../utils/constants"

export default function WarehousePipClient() {
	const ledBlocks = createCustomCategory(
		"LED",
		ledCategoryColour,
		["esp32_led_control"]
	)
	const toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition = {
		kind: "categoryToolbox",
		contents: [ledBlocks]
	}
	return (
		<LabCodeComponent
			nextPageActivity="Summary"
			nextPageLink="/lab/led/summary"
			nextPageTooltip="LED Summary"
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			codingTitle="Warehouse Pip"
			codingDescription="Warehouse Pip Description"
			toolboxConfig={toolboxConfig}
		/>
	)
}
