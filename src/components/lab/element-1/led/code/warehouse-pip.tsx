import * as Blockly from "blockly"
import LabCodeComponent from "../../../code/lab-code-component"
import { createCustomCategory } from "../../../../../utils/blockly/toolbox-config"

export default function WarhousePip() {
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
			nextPageActivity="Summary"
			nextPageLink="/lab/element-1/led/summary"
			nextPageTooltip="LED Summary"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			codingTitle="Warehouse Pip"
			codingDescription="Warehouse Pip Description"
			toolboxConfig={toolboxConfig}
		/>
	)
}
