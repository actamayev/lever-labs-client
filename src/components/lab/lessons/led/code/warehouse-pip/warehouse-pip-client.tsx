"use client"

import * as Blockly from "blockly"
import { createCustomCategory } from "../../../../../../utils/blockly/toolbox-config"
import LabCodeComponent from "../../../../code/lab-code-component"
import { ledCategoryColour } from "../../../../../../utils/constants/constants"
import { LED_BLOCK_TYPES } from "@bluedotrobots/common-ts"

export default function WarehousePipClient() {
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
