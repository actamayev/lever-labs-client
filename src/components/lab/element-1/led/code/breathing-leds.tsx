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
			previousPageLink="/lab/element-1/led/reading/leds-and-loops"
			previousPageActivity="Reading"
			previousPageTooltip="LEDs and Loops"
			nextPageActivity="Reading"
			nextPageLink="/lab/element-1/led/reading/gpio"
			nextPageTooltip="GPIO"
			element={1}
			lessonTitle="LED"
			lessonProgressPercent={200 / 6}
			codingTitle="Breathing LEDs"
			codingDescription="Coding Description"
			toolboxConfig={toolboxConfig}
		/>
	)
}
